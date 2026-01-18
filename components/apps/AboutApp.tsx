"use client";

import React from "react";
import { Download, Mail, Github, Linkedin } from "lucide-react";

export default function AboutApp() {
    return (<div className="relative h-full overflow-hidden bg-gray-900 text-white selection:bg-indigo-500/30">
        {/* Animated Space Background */}
        <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2342&auto=format&fit=crop')",
                animation: "space-zoom 20s ease-in-out infinite alternate"
            }}
        />

        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] pointer-events-none" />

        {/* Animation Styles */}
        <style jsx global>{`
                @keyframes space-zoom {
                    0% { transform: scale(1.1); }
                    100% { transform: scale(1.7); }
                }
            `}</style>

        {/* Content Container */}
        <div className="relative z-10 h-full overflow-y-auto p-8">
            <div className="max-w-4xl mx-auto grid md:grid-cols-[200px_1fr] gap-8">
                {/* Profile Sidebar */}
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <img
                            src="pfp.png"
                            alt="Akhil Akella"
                            className="relative w-40 h-40 rounded-full border-2 border-gray-800 object-cover bg-gray-600"
                        />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-white">Akhil Akella</h2>
                        <p className="text-purple-400 font-medium">Full Stack Developer</p>
                    </div>

                    <div className="flex space-x-3">
                        <a
                            href="https://github.com/akkified"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 hover:text-white transition-all text-gray-400 backdrop-blur-sm"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/akhil-akella-149215331/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 hover:text-white transition-all text-gray-400 backdrop-blur-sm"
                        >
                            <Linkedin size={20} />
                        </a>
                        <a
                            href="mailto:akki.akella@gmail.com"
                            className="p-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 hover:text-white transition-all text-gray-400 backdrop-blur-sm"
                        >
                            <Mail size={20} />
                        </a>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-8">
                    <section>
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 mb-4 animate-in slide-in-from-bottom-2 duration-500">
                            Hi, I'm Akhil.
                        </h1>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            I'm a sophomore at the Alliance Academy of Innovation with a
                            passion for full-stack development and emerging technologies. I
                            love solving complex problems and turning ideas into reality
                            through code.
                        </p>
                        <p className="text-gray-300 leading-relaxed mt-4">
                            When I'm not coding, you can find me exploring the latest trends
                            in web development and AI.
                        </p>
                    </section>

                    <section className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm group">
                            <h3 className="text-3xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform origin-left">5+</h3>
                            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Projects Completed</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm group">
                            <h3 className="text-3xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform origin-left">4.375</h3>
                            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">GPA</p>
                        </div>
                    </section>

                    <div className="p-6 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-2xl border border-indigo-500/20 backdrop-blur-sm">
                        <h3 className="text-lg font-bold text-indigo-300 mb-2 flex items-center gap-2">
                            Current Focus
                        </h3>
                        <p className="text-indigo-100/80 leading-relaxed">
                            Exploring Agentic AI workflows and building OS-like web interfaces.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
