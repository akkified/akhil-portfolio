"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./IntroScreen.module.css";
import { Space_Mono, Michroma, Space_Grotesk } from "next/font/google";
import { UserCircle, Code2, FolderOpen, Zap, Brain, Globe } from "lucide-react";

const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"] });
const michroma = Michroma({ weight: "400", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const TOTAL_FRAMES = 650;
const SCROLL_SPEED = 0.15;
const LERP_SPEED = 0.15;
const MAX_RIPPLES = 15;
const RIPPLE_SPACING = 30;
const RIPPLE_LIFE = 1.8;
const OVERLAY_FADE_START = 30;
const OVERLAY_FADE_END = 45;
const TAG3D_START = 40;
const TAG3D_PHASE2 = 97;
const TAG3D_END = 175;

const ABOUT_START = 180;
const ABOUT_END = 300;
const SKILLS_START = 320;
const SKILLS_END = 450;
const PROJECTS_START = 470;
const PROJECTS_END = 620;

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }
function easeOutQuart(t: number) { return 1 - Math.pow(1 - t, 4); }
function clamp01(v: number) { return Math.max(0, Math.min(1, v)); }

const VERT_SRC = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_uv;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_uv = a_texCoord;
  }
`;

const FRAG_SRC = `
  precision highp float;
  varying vec2 v_uv;
  uniform vec2  u_resolution;
  uniform vec2  u_mouse;
  uniform vec2  u_mouseVel;
  uniform float u_mouseSpeed;
  uniform float u_time;
  uniform int   u_rippleCount;
  uniform vec4  u_ripples[${MAX_RIPPLES}];
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  void main() {
    float aspect = u_resolution.x / u_resolution.y;
    vec2 asp = vec2(aspect, 1.0);
    vec2 displacement = vec2(0.0);
    float mouseDist = distance(v_uv * asp, u_mouse * asp);
    float lensRadius = 0.24;
    vec2 toMouse = v_uv - u_mouse;
    float hover = smoothstep(lensRadius, 0.0, mouseDist);
    displacement += toMouse * hover * 0.05;
    if (mouseDist < lensRadius && u_mouseSpeed > 0.001) {
      float t = 1.0 - mouseDist / lensRadius;
      t = t * t * (3.0 - 2.0 * t);
      float strength = min(u_mouseSpeed * 0.14, 0.072);
      displacement += u_mouseVel / (u_mouseSpeed + 0.0001) * t * strength;
      vec2 d = v_uv - u_mouse;
      float ang = t * u_mouseSpeed * 0.55;
      float ca = cos(ang), sa = sin(ang);
      displacement += (vec2(d.x*ca - d.y*sa, d.x*sa + d.y*ca) - d) * 0.32;
    }
    for (int i = 0; i < ${MAX_RIPPLES}; i++) {
      if (i >= u_rippleCount) break;
      vec2 rPos = u_ripples[i].xy; float rBorn = u_ripples[i].z; float rStr = u_ripples[i].w;
      float age = u_time - rBorn;
      if (age > ${RIPPLE_LIFE.toFixed(1)}) continue;
      float fade = 1.0 - age / ${RIPPLE_LIFE.toFixed(1)}; fade *= fade;
      float radius = age * 0.35;
      float dist = distance(v_uv * asp, rPos * asp);
      float ring = abs(dist - radius); float width = 0.06;
      if (ring < width) {
        float wave = cos(ring / width * 3.14159265) * 0.5 + 0.5;
        vec2 dir = normalize(v_uv - rPos + 0.0001);
        displacement += dir * wave * fade * rStr * 0.012;
      }
    }
    vec2 sampleUV = v_uv + displacement;
    float aberr = length(displacement) * 7.0;
    vec2 aberrDir = aberr > 0.0 ? normalize(displacement) : vec2(0.0);
    float aberrOff = aberr * 0.004;

    vec2 uv = sampleUV * 2.0 - 1.0;
    uv.x *= aspect;
    float n = hash(uv * 10.0 + u_time * 0.05);
    float stars = pow(n, 60.0) * 2.5;
    float d = length(uv);
    vec3 bg = mix(vec3(0.015, 0.015, 0.03), vec3(0.0), smoothstep(0.0, 1.5, d));
    bg += stars * vec3(0.6, 0.8, 1.0) * (0.5 + 0.5 * sin(u_time + hash(uv)*100.0));
    
    // Aberration colors
    bg.r += aberrOff * 40.0;
    bg.b += aberrOff * 40.0;
    
    float vig = smoothstep(1.3, 0.4, distance(v_uv, vec2(0.5)) * 1.7);
    bg *= mix(0.55, 1.0, vig);
    
    gl_FragColor = vec4(bg, 1.0);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error("Shader:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);

  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  
  const [glitchedWords, setGlitchedWords] = useState<Set<string>>(new Set());

  useEffect(() => {
    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let uniforms: any = {};
    const ripples: any[] = [];
    
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let prevMX = mouse.x, prevMY = mouse.y;
    let smoothVelX = 0, smoothVelY = 0, smoothSpeed = 0;
    let ringX = mouse.x, ringY = mouse.y;
    let lastRipX = mouse.x, lastRipY = mouse.y;
    
    let brandSpansCache: HTMLElement[] | null = null;
    let p1WordsCache: Element[] | null = null;
    let p2WordsCache: Element[] | null = null;
    
    let currentFrame = 0;
    let targetFrame = 0;
    const startTime = performance.now() / 1000;
    let requestFrameId: number;

    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    // SCROLL / WHEEL
    const handleWheel = (e: WheelEvent) => {
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 30;
      if (e.deltaMode === 2) delta *= window.innerHeight;
      targetFrame += delta * SCROLL_SPEED;
      targetFrame = Math.max(0, targetFrame);
      if (targetFrame > TOTAL_FRAMES) targetFrame = TOTAL_FRAMES + 20; // slight overshoot buffer
    };
    
    let lastTouchY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const y = e.touches[0].clientY;
      targetFrame += (lastTouchY - y) * 0.5;
      targetFrame = Math.max(0, targetFrame);
      lastTouchY = y;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    // MOUSE
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const dx = mouse.x - lastRipX;
      const dy = mouse.y - lastRipY;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d > RIPPLE_SPACING) {
        const speed = Math.min(d / 30, 3);
        ripples.push({
          x: mouse.x / window.innerWidth,
          y: mouse.y / window.innerHeight,
          t: performance.now() / 1000 - startTime,
          s: speed * 0.5,
        });
        if (ripples.length > MAX_RIPPLES) ripples.shift();
        lastRipX = mouse.x;
        lastRipY = mouse.y;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    // INIT WEBGL
    const initWebGL = () => {
      gl = canvasEl.getContext("webgl", { alpha: false, antialias: false });
      if (!gl) return false;
      const vs = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC);
      const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
      if (!vs || !fs) return false;
      
      program = gl.createProgram();
      if (!program) return false;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Link:", gl.getProgramInfoLog(program));
        return false;
      }
      gl.useProgram(program);

      const verts = new Float32Array([-1, 1, 0, 0, 1, 1, 1, 0, -1, -1, 0, 1, 1, -1, 1, 1]);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

      const aPos = gl.getAttribLocation(program, "a_position");
      const aTex = gl.getAttribLocation(program, "a_texCoord");
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 16, 0);
      gl.enableVertexAttribArray(aTex);
      gl.vertexAttribPointer(aTex, 2, gl.FLOAT, false, 16, 8);

      const u = (n: string) => gl!.getUniformLocation(program!, n);
      uniforms = {
        resolution: u("u_resolution"),
        mouse: u("u_mouse"),
        mouseVel: u("u_mouseVel"),
        mouseSpeed: u("u_mouseSpeed"),
        time: u("u_time"),
        rippleCount: u("u_rippleCount"),
        ripples: Array.from({ length: MAX_RIPPLES }).map((_, i) => u(`u_ripples[${i}]`))
      };
      return true;
    };

    const resize = () => {
      canvasEl.width = window.innerWidth;
      canvasEl.height = window.innerHeight;
      if (gl) gl.viewport(0, 0, canvasEl.width, canvasEl.height);
    };
    window.addEventListener("resize", resize);

    if (initWebGL()) {
      resize();
    }

    // ANIMATION LOOP
    const animate = () => {
      const diff = targetFrame - currentFrame;
      if (Math.abs(diff) > 0.5) currentFrame += diff * LERP_SPEED;
      else currentFrame = targetFrame;
      
      const idx = Math.min(Math.max(Math.round(currentFrame), 0), TOTAL_FRAMES + 20);

      // WebGL Draw
      const now = performance.now() / 1000 - startTime;
      while (ripples.length && now - ripples[0].t > RIPPLE_LIFE) ripples.shift();

      const rawVX = (mouse.x - prevMX) / window.innerWidth;
      const rawVY = (mouse.y - prevMY) / window.innerHeight;
      smoothVelX += (rawVX - smoothVelX) * 0.18;
      smoothVelY += (rawVY - smoothVelY) * 0.18;
      smoothSpeed = Math.sqrt(smoothVelX * smoothVelX + smoothVelY * smoothVelY);
      prevMX = mouse.x;
      prevMY = mouse.y;

      if (gl && program) {
        gl.uniform2f(uniforms.resolution, canvasEl.width, canvasEl.height);
        gl.uniform2f(uniforms.mouse, mouse.x / window.innerWidth, mouse.y / window.innerHeight);
        gl.uniform2f(uniforms.mouseVel, smoothVelX, smoothVelY);
        gl.uniform1f(uniforms.mouseSpeed, smoothSpeed);
        gl.uniform1f(uniforms.time, now);
        gl.uniform1i(uniforms.rippleCount, ripples.length);
        for (let i = 0; i < MAX_RIPPLES; i++) {
          if (i < ripples.length) {
            gl.uniform4f(uniforms.ripples[i], ripples[i].x, ripples[i].y, ripples[i].t, ripples[i].s);
          } else {
            gl.uniform4f(uniforms.ripples[i], 0, 0, -99, 0);
          }
        }
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }

      // Cursor update
      if (dotRef.current && ringRef.current) {
        dotRef.current.style.left = `${mouse.x}px`;
        dotRef.current.style.top = `${mouse.y}px`;
        ringX += (mouse.x - ringX) * 0.14;
        ringY += (mouse.y - ringY) * 0.14;
        const vx = mouse.x - ringX;
        const vy = mouse.y - ringY;
        const speed = Math.sqrt(vx * vx + vy * vy);
        const angle = Math.atan2(vy, vx);
        const scaleX = 1 + Math.min(speed * 0.012, 0.5);
        const scaleY = 1 - Math.min(speed * 0.006, 0.2);
        const breath = 1 + Math.sin(performance.now() * 0.003) * 0.04;
        
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
        ringRef.current.style.transform = `translate3d(-50%,-50%,0) rotate(${angle}rad) scale(${scaleX * breath}, ${scaleY * breath})`;

        if (brandSpansCache === null) {
          const spans = document.querySelectorAll(`.${styles.brandLine} span`);
          brandSpansCache = spans ? (Array.from(spans) as HTMLElement[]) : [];
        }
        
        if (p1WordsCache === null) {
          const words = phase1Ref.current?.querySelectorAll(`.${styles.tag3dWord}`);
          p1WordsCache = words ? Array.from(words) : [];
        }
        
        if (p2WordsCache === null) {
          const words = phase2Ref.current?.querySelectorAll(`.${styles.tag3dWord}`);
          p2WordsCache = words ? Array.from(words) : [];
        }

        // Mouse font magnetic effect (brandline spans)
        const brandSpans = brandSpansCache;
        if (brandSpans && brandSpans.length > 0) {
          brandSpans.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = mouse.x - cx;
            const dy = mouse.y - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 160;
            if (dist < radius) {
              const t = 1 - dist / radius;
              const push = t * t;
              const moveX = -(dx / (dist || 1)) * push * 8;
              const moveY = -(dy / (dist || 1)) * push * 6;
              const scale = 1 + push * 0.2;
              const skew = push * 4 * (dx > 0 ? 1 : -1);
              el.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale}) skewX(${skew}deg)`;
              el.style.textShadow = `0 0 ${push * 40}px rgba(255,255,255,${push * 0.7}), ${push * 3}px 0 rgba(0,255,255,${push * 0.3}), ${-push * 3}px 0 rgba(255,0,255,${push * 0.3})`;
            } else {
              el.style.transform = "";
              el.style.textShadow = "";
            }
          });
        }
      }

      // Update Overlay Visibility
      if (overlayRef.current) {
        let scale = 1;
        if (idx >= 0 && idx <= 100) {
          const t = (idx - 0) / (100 - 0);
          scale = 1 + (1.15 - 1) * t;
        } else if (idx > 100) {
          scale = 1.15;
        }
        overlayRef.current.style.transform = `scale(${scale})`;

        if (idx <= OVERLAY_FADE_START) {
          overlayRef.current.style.opacity = "1";
        } else if (idx >= OVERLAY_FADE_END) {
          overlayRef.current.style.opacity = "0";
        } else {
          const t = (idx - OVERLAY_FADE_START) / (OVERLAY_FADE_END - OVERLAY_FADE_START);
          overlayRef.current.style.opacity = String(1 - t);
        }
      }

      // Update 3D Tagline
      const parallaxX = (mouse.x / window.innerWidth - 0.5) * 12;
      const parallaxY = (mouse.y / window.innerHeight - 0.5) * 10;

      if (phase1Ref.current) {
        if (idx < TAG3D_START || idx > TAG3D_END) {
          phase1Ref.current.style.opacity = "0";
        } else {
          const p1Duration = TAG3D_PHASE2 - TAG3D_START;
          const p1Progress = clamp01((idx - TAG3D_START) / p1Duration);
          const p1FadeOut = idx > TAG3D_PHASE2 ? clamp01(1 - (idx - TAG3D_PHASE2) / 15) : 1;
          const p1FadeIn = clamp01((idx - TAG3D_START) / 8);
          phase1Ref.current.style.opacity = String(p1FadeIn * p1FadeOut);
          
          const p1Zoom = 1 + p1Progress * 0.18;
          const p1TiltX = 6 * (1 - easeOutCubic(clamp01(p1Progress / 0.5)));
          phase1Ref.current.style.transform = `translateY(-50%) rotateX(${p1TiltX + parallaxY * 0.35}deg) rotateY(${parallaxX * 0.28}deg) scale(${p1Zoom})`;

          if (p1WordsCache) {
            p1WordsCache.forEach((word: any, i: number) => {
              const wordStart = i / p1WordsCache!.length;
              const wordDuration = 1 / p1WordsCache!.length;
              const wordP = clamp01((p1Progress - wordStart) / wordDuration);
              const ease = easeOutQuart(wordP);

              const rotY = 50 * (1 - ease);
              const rotX = 12 * (1 - ease);
              const transZ = -350 * (1 - ease);
              const transX = -90 * (1 - ease);
              const transY = 25 * (1 - ease);
              const scaleW = 0.6 + 0.4 * ease;
              const alpha = clamp01(wordP * 3);

              word.style.opacity = String(alpha);
              word.style.transform = `translateX(${transX}px) translateY(${transY}px) translateZ(${transZ}px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${scaleW})`;

              if (ease > 0.3) {
                const letters = word.querySelectorAll("span");
                letters.forEach((s: any, li: number) => {
                  const centerI = li - (letters.length - 1) / 2;
                  const zOff = centerI * 6 * ease;
                  const float = Math.sin(now * 1.2 + li * 0.6 + i * 2.5) * 2 * ease;
                  const floatZ = Math.cos(now * 0.8 + li * 0.9 + i * 2.5) * 3 * ease;
                  s.style.transform = `translateZ(${zOff + floatZ}px) translateY(${float}px)`;
                });
              }

              const glow = ease * 0.4;
              word.style.textShadow = `
                0 0 ${10 + ease * 50}px rgba(255,255,255,${glow}),
                0 0 ${30 + ease * 60}px rgba(255,255,255,${glow * 0.3}),
                0 0 ${80 + ease * 40}px rgba(100,200,255,${glow * 0.08}),
                0 4px 25px rgba(0,0,0,0.7)`;

              if (alpha > 0.3) {
                const key = `p1-${i}`;
                if (!glitchedWords.has(key)) {
                  setGlitchedWords((prev) => new Set(prev).add(key));
                  word.querySelectorAll("span").forEach((s: any, li: number) => {
                    setTimeout(() => {
                      s.classList.add(styles.tagGlitch);
                      setTimeout(() => s.classList.remove(styles.tagGlitch), 350);
                    }, li * 40);
                  });
                }
              }
            });
          }
        }
      }

      if (phase2Ref.current) {
        if (idx < TAG3D_PHASE2 || idx > TAG3D_END + 30) { 
          phase2Ref.current.style.opacity = "0";
        } else {
          const p2Duration = TAG3D_END - TAG3D_PHASE2;
          const p2Progress = clamp01((idx - TAG3D_PHASE2) / p2Duration);
          const p2FadeIn = clamp01((idx - TAG3D_PHASE2) / 8);
          const p2FadeOut = clamp01((TOTAL_FRAMES - idx) / 20);
          phase2Ref.current.style.opacity = String(p2FadeIn * p2FadeOut);

          const p2Zoom = 1 + p2Progress * 0.15;
          const p2TiltX = -5 * (1 - easeOutCubic(clamp01(p2Progress / 0.4)));
          phase2Ref.current.style.transform = `translateY(-50%) rotateX(${p2TiltX + parallaxY * 0.3}deg) rotateY(${parallaxX * 0.22}deg) scale(${p2Zoom})`;

          if (p2WordsCache) {
            p2WordsCache.forEach((word: any, i: number) => {
              const wordStart = i / p2WordsCache!.length;
              const wordDuration = 1 / p2WordsCache!.length;
              const wordP = clamp01((p2Progress - wordStart) / wordDuration);
              const ease = easeOutQuart(wordP);

              const rotY = -45 * (1 - ease);
              const rotX = -10 * (1 - ease);
              const transZ = -300 * (1 - ease);
              const transX = 70 * (1 - ease);
              const transY = -20 * (1 - ease);
              const scaleW = 0.55 + 0.45 * ease;
              const alpha = clamp01(wordP * 3);

              word.style.opacity = String(alpha);
              word.style.transform = `translateX(${transX}px) translateY(${transY}px) translateZ(${transZ}px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${scaleW})`;

              if (ease > 0.3) {
                const letters = word.querySelectorAll("span");
                letters.forEach((s: any, li: number) => {
                  const centerI = li - (letters.length - 1) / 2;
                  const zOff = centerI * 5 * ease;
                  const float = Math.sin(now * 1.2 + li * 0.6 + i * 3.0 + 10) * 2 * ease;
                  const floatZ = Math.cos(now * 0.8 + li * 0.9 + i * 3.0 + 10) * 3 * ease;
                  s.style.transform = `translateZ(${zOff + floatZ}px) translateY(${float}px)`;
                });
              }

              const glow = ease * 0.35;
              word.style.textShadow = `
                0 0 ${10 + ease * 45}px rgba(255,255,255,${glow}),
                0 0 ${30 + ease * 55}px rgba(255,255,255,${glow * 0.25}),
                0 0 ${70 + ease * 40}px rgba(100,200,255,${glow * 0.06}),
                0 4px 22px rgba(0,0,0,0.7)`;

              if (alpha > 0.3) {
                const key = `p2-${i}`;
                if (!glitchedWords.has(key)) {
                  setGlitchedWords((prev) => new Set(prev).add(key));
                  word.querySelectorAll("span").forEach((s: any, li: number) => {
                    setTimeout(() => {
                      s.classList.add(styles.tagGlitch);
                      setTimeout(() => s.classList.remove(styles.tagGlitch), 350);
                    }, li * 40);
                  });
                }
              }
            });
          }
        }
      }

      // NEW PHASES
      const updateCard = (ref: React.RefObject<HTMLDivElement | null>, start: number, end: number, zOffset: number) => {
        if (!ref.current) return;
        if (idx < start || idx > end) {
          ref.current.style.opacity = "0";
        } else {
          const duration = end - start;
          const progress = clamp01((idx - start) / duration);
          const fadeIn = clamp01((idx - start) / 15);
          const fadeOut = clamp01((end - idx) / 20);
          ref.current.style.opacity = String(fadeIn * fadeOut);

          // Fly in from deep Z, rotate slightly
          const zDepth = 800 * (1 - easeOutQuart(progress));
          const rotX = 15 * (1 - progress);
          const rotY = -10 * (1 - progress) + parallaxX * 0.3;
          const tiltX = parallaxY * 0.3;
          
          ref.current.style.transform = `translateZ(${-zDepth + zOffset}px) rotateX(${rotX + tiltX}deg) rotateY(${rotY}deg) scale(${1 + progress * 0.05})`;
        }
      };

      updateCard(aboutRef, ABOUT_START, ABOUT_END, 0);
      updateCard(skillsRef, SKILLS_START, SKILLS_END, 0);
      updateCard(projectsRef, PROJECTS_START, PROJECTS_END, 0);

      // Completion Check
      if (idx > TOTAL_FRAMES - 5 && idx >= targetFrame) {
        // Trigger exit transition
        onComplete();
      }

      requestFrameId = requestAnimationFrame(animate);
    };

    requestFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(requestFrameId);
    };
  }, [onComplete]);

  // Helper to split text into spans with --i variable
  const renderGlitchedText = (text: string) => {
      return text.split("").map((ch, i) => (
          <span
            key={i}
            style={{ "--i": i } as React.CSSProperties}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.classList.remove(styles.glitchActive);
              void el.offsetWidth; // trigger reflow
              el.classList.add(styles.glitchActive);
            }}
            onAnimationEnd={(e) => {
              (e.currentTarget as HTMLElement).classList.remove(styles.glitchActive);
            }}
          >
              {ch === " " ? "\u00A0" : ch}
          </span>
      ));
  };
  
  const renderTag3dWord = (text: string, index: number) => {
      return (
          <div className={styles.tag3dWord} data-word={index}>
              {text.split("").map((ch, i) => (
                  <span key={i} style={{ "--i": i, "--depth": i } as React.CSSProperties}>
                      {ch === " " ? "\u00A0" : ch}
                  </span>
              ))}
          </div>
      );
  }

  return (
    <div className={`${styles.container} ${spaceGrotesk.className}`}>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
      
      {/* Overlay Initial */}
      <div ref={overlayRef} className={styles.overlay}>
        <div className={styles.brand}>
          <div className={`${styles.brandLine} ${michroma.className}`}>
              {renderGlitchedText("A. AKELLA")}
          </div>
          <div className={`${styles.brandLine} ${michroma.className}`} style={{fontSize: "clamp(24px, 3vw, 40px)", marginTop: "10px", color: "rgba(255,255,255,0.7)"}}>
              {renderGlitchedText("OS")}
          </div>
          <p className={`${styles.brandSub} ${spaceMono.className}`}>// Digital Workspace</p>
          <p className={`${styles.brandSub} ${spaceMono.className}`}>Developed in 2026</p>
        </div>

        <div className={styles.scrollHint}>
          <p className={spaceMono.className}>Scroll down to</p>
          <p className={spaceMono.className}>discover.</p>
          <div className={styles.scrollLine}></div>
        </div>
      </div>

      {/* Tagline 3D Left */}
      <div className={styles.tagline3d}>
        <div ref={phase1Ref} className={`${styles.tag3dPhase} ${styles.tag3dPhaseLeft}`}>
            {renderTag3dWord("CODING", 0)}
            {renderTag3dWord("THE", 1)}
            {renderTag3dWord("UNIVERSE", 2)}
        </div>

        {/* Tagline 3D Right */}
        <div ref={phase2Ref} className={`${styles.tag3dPhase} ${styles.tag3dPhaseRight}`}>
            {renderTag3dWord("ONE", 0)}
            {renderTag3dWord("PIXEL", 1)}
            {renderTag3dWord("AT A", 2)}
            {renderTag3dWord("TIME", 3)}
        </div>
      </div>

      {/* Info Cards Overlay Container */}
      <div className={styles.infoCardOverlay}>
        
        {/* About Card */}
        <div ref={aboutRef} className={styles.infoCard}>
          <div className={styles.infoCardTitle}>Profile</div>
          <p className={styles.infoCardContent}>
            Welcome to my Digital Workspace. I'm a passionate full-stack developer dedicated to exploring agentic UI and building software that drives impact.
          </p>
          <div className={styles.infoGrid}>
            <div className={styles.infoRow}>
              <div className={styles.infoIcon}><UserCircle size={28} /></div>
              <div>
                <h4>Akhil Akella</h4>
                <p>Full Stack Developer</p>
              </div>
            </div>
            <div className={styles.infoRow}>
              <div className={styles.infoIcon}><Zap size={28} /></div>
              <div>
                <h4>Impact</h4>
                <p>5+ major projects shipped, maintaining a 4.375 GPA.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Card */}
        <div ref={skillsRef} className={styles.infoCard}>
          <div className={styles.infoCardTitle}>System Modules</div>
          <p className={styles.infoCardContent}>
            Capabilities initialized and scaled for performance.
          </p>
          <div className={styles.infoGrid}>
            <div className={styles.infoRow}>
              <div className={styles.infoIcon}><Code2 size={28} /></div>
              <div>
                <h4>Development</h4>
                <p>React, Next.js, Node.js, Flask, PostgreSQL</p>
              </div>
            </div>
            <div className={styles.infoRow}>
              <div className={styles.infoIcon}><Brain size={28} /></div>
              <div>
                <h4>AI & ML Pipeline</h4>
                <p>TensorFlow, PyTorch, Unsloth, CNNs, OpenCV</p>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Card */}
        <div ref={projectsRef} className={styles.infoCard}>
          <div className={styles.infoCardTitle}>Active Tasks</div>
          <p className={styles.infoCardContent}>
            Scanning active repositories and deployments.
          </p>
          <div className={styles.infoGrid}>
            <div className={styles.infoRow}>
              <div className={styles.infoIcon}><FolderOpen size={28} /></div>
              <div>
                <h4>PaperHearts</h4>
                <p>Full-Stack platform enabling emotional and financial support.</p>
              </div>
            </div>
            <div className={styles.infoRow}>
              <div className={styles.infoIcon}><Globe size={28} /></div>
              <div>
                <h4>Stroke Classification</h4>
                <p>My first ML project! A model designed to predict strokes.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div ref={dotRef} className={styles.cursorDot}></div>
      <div ref={ringRef} className={styles.cursorRing}></div>
    </div>
  );
}
