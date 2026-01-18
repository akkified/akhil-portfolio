"use client";

import React, { ReactNode } from "react";
import { useWindow } from "./WindowContext";
import Taskbar from "./Taskbar";
import Window from "./Window";
import WelcomeApp from "../apps/WelcomeApp";
import { HelpCircle } from "lucide-react";

interface DesktopProps {
    children?: ReactNode;
}

export default function Desktop({ children }: DesktopProps) {
    const { windows, openWindow } = useWindow();

    React.useEffect(() => {
        // Auto-open Welcome App
        // setTimeout to ensure it opens slightly after layout stabilizes or just immediately
        const timer = setTimeout(() => {
            openWindow("welcome", "Welcome Guide", <WelcomeApp />, HelpCircle);
        }, 500);
        return () => clearTimeout(timer);
    }, []); // Run once on mount

    return (
        <div className="fixed inset-0 overflow-hidden font-sans selection:bg-purple-500/30">
            {/* Animated Background */}
            <div
                className="absolute inset-0 bg-cover bg-center pointer-events-none transform scale-110"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')",
                    animation: "breathe 25s ease-in-out infinite alternate"
                }}
            />
            {/* Keyframes for simple movement */}
            <style jsx global>{`
                @keyframes breathe {
                    0% { transform: scale(1.1) translate(0, 0); }
                    100% { transform: scale(1.25) translate(-3%, -3%); }
                }
            `}</style>
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[0px]"></div>

            {/* Desktop Icons Area */}
            <div className="relative z-10 w-full h-[calc(100vh-48px)] p-4 grid gap-4 content-start items-start justify-start grid-cols-3 grid-flow-row overflow-y-auto md:grid-flow-col md:grid-rows-[repeat(auto-fill,100px)] md:overflow-visible">
                {children}
            </div>

            {/* Windows Layer */}
            <div className="absolute inset-0 pointer-events-none z-20">
                {/* pointer-events-none on container so clicks pass through to icons, but Windows need pointer-events-auto */}
                {windows.map((win) => (
                    <div key={win.id} className="pointer-events-auto">
                        <Window id={win.id} title={win.title}>
                            {win.content}
                        </Window>
                    </div>
                ))}
            </div>

            {/* Taskbar */}
            <Taskbar />
        </div>
    );
}
