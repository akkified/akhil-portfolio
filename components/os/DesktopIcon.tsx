"use client";

import React from "react";
import { useWindow } from "./WindowContext";

interface DesktopIconProps {
    id: string;
    title: string;
    icon: React.ElementType;
    component: React.ReactNode;
    bgGradient?: string;
}

export default function DesktopIcon({
    id,
    title,
    icon: Icon,
    component,
    bgGradient = "from-blue-500 to-purple-600"
}: DesktopIconProps) {
    const { openWindow } = useWindow();

    const handleDoubleClick = () => {
        openWindow(id, title, component, Icon);
    };

    return (
        <button
            onDoubleClick={handleDoubleClick}
            className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors group w-24 text-center cursor-pointer focus:outline-none focus:bg-white/20"
        >
            <div className={`w-14 h-14 bg-gradient-to-br ${bgGradient} rounded-xl shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform border border-white/10`}>
                <Icon size={28} className="text-white drop-shadow-md" />
            </div>
            <span className="text-sm font-medium text-white shadow-black drop-shadow-md select-none line-clamp-2 leading-tight">
                {title}
            </span>
        </button>
    );
}
