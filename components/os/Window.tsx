"use client";

import React, { useRef, useEffect } from "react";
import { motion, useDragControls } from "framer-motion";
import { X, Minus, Square, Maximize2 } from "lucide-react";
import { useWindow } from "./WindowContext";

import { useMediaQuery } from "@/hooks/useMediaQuery";

interface WindowProps {
    id: string;
    title: string;
    children: React.ReactNode;
}

export default function Window({ id, title, children }: WindowProps) {
    const { windows, closeWindow, minimizeWindow, maximizeWindow, focusWindow } = useWindow();
    const windowState = windows.find((w) => w.id === id);
    const scrollableRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery("(max-width: 768px)");

    // Focus window on click
    const handleFocus = () => {
        focusWindow(id);
    };

    if (!windowState || !windowState.isOpen || windowState.isMinimized) {
        return null;
    }

    const isMaximized = windowState.isMaximized || isMobile;

    return (
        <motion.div
            drag={!isMaximized}
            dragMomentum={false}
            dragElastic={0.1}
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                width: isMaximized ? "100vw" : "800px",
                height: isMaximized ? "calc(100vh - 48px)" : "600px",
                left: isMaximized ? 0 : undefined,
                top: isMaximized ? 0 : undefined,
                position: isMaximized ? "fixed" : "absolute",
                x: isMaximized ? 0 : undefined, // Reset x/y when maximized
            }}
            exit={{ scale: 0.9, opacity: 0 }}
            onDragStart={handleFocus}
            onMouseDown={handleFocus}
            style={{
                zIndex: windowState.zIndex,
                // Center the window initially if not maximized
                // We'll rely on Flexbox centering or absolute positioning in Desktop for initial placement,
                // but framer-motion drag uses transforms.
                // A simple centered approach:
                top: isMaximized ? 0 : "10%",
                left: isMaximized ? 0 : "20%",
            }}
            className={`fixed bg-gray-900 border border-gray-700 rounded-lg shadow-2xl overflow-hidden flex flex-col ${isMaximized ? "rounded-none border-none" : ""
                }`}
        >
            {/* Title Bar */}
            <div
                className="h-10 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4 select-none cursor-default"
                onDoubleClick={() => !isMobile && maximizeWindow(id)}
            >
                <div className="flex items-center space-x-2">
                    {/* Draggable handle for non-maximized windows */}
                    <div className="font-semibold text-gray-200 text-sm flex items-center space-x-2">
                        <span>{title}</span>
                    </div>
                </div>

                {/* Window Controls */}
                <div className="flex items-center space-x-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            minimizeWindow(id);
                        }}
                        className="p-1.5 hover:bg-gray-700 rounded-md text-gray-400 hover:text-white transition-colors"
                    >
                        <Minus size={14} />
                    </button>
                    {!isMobile && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                maximizeWindow(id);
                            }}
                            className="p-1.5 hover:bg-gray-700 rounded-md text-gray-400 hover:text-white transition-colors"
                        >
                            {isMaximized ? <Maximize2 size={12} /> : <Square size={12} />}
                        </button>
                    )}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            closeWindow(id);
                        }}
                        className="p-1.5 hover:bg-red-500 rounded-md text-gray-400 hover:text-white transition-colors group"
                    >
                        <X size={14} className="group-hover:text-white" />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto bg-gray-950/90 text-gray-100 relative p-1" ref={scrollableRef}>
                {children}
            </div>
        </motion.div>
    );
}
