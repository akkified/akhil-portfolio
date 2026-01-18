"use client";

import React, { ReactNode } from "react";
import { useWindow } from "./WindowContext";
import Taskbar from "./Taskbar";
import Window from "./Window";

interface DesktopProps {
    children?: ReactNode;
}

export default function Desktop({ children }: DesktopProps) {
    const { windows } = useWindow();

    return (
        <div
            className="fixed inset-0 overflow-hidden bg-cover bg-center font-sans selection:bg-purple-500/30"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')"
                // A nice abstract dark fluid wallpaper
            }}
        >
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[0px]"></div>

            {/* Desktop Icons Area */}
            <div className="relative z-10 w-full h-[calc(100vh-48px)] p-4 grid grid-flow-col grid-rows-[repeat(auto-fill,100px)] gap-4 content-start items-start justify-start">
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
