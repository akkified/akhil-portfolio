"use client";

import React, { useState, useEffect, useRef } from "react";
import { LayoutGrid, Wifi, Battery, Volume2, Search, ChevronUp } from "lucide-react";
import { useWindow } from "./WindowContext";
import { format } from "date-fns";
import StartMenu from "./StartMenu";
import { WifiPopup, VolumePopup, BatteryPopup } from "./TrayPopups";

export default function Taskbar() {
    const { windows, restoreWindow, minimizeWindow, focusWindow } = useWindow();
    const [time, setTime] = useState(new Date());
    const [isStartOpen, setIsStartOpen] = useState(false);
    const [activePopup, setActivePopup] = useState<"wifi" | "volume" | "battery" | null>(null);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Close start menu/popups when clicking outside
    // (Simple implementation: separate button logic handles toggles)

    const activeWindows = windows.filter((w) => w.isOpen);

    const handleWindowClick = (id: string, isMinimized: boolean, isActive: boolean) => {
        if (isMinimized) {
            restoreWindow(id);
        } else if (isActive) {
            minimizeWindow(id);
        } else {
            focusWindow(id);
        }
    };

    const sortedWindows = [...activeWindows].sort((a, b) => a.id.localeCompare(b.id));

    const togglePopup = (popup: "wifi" | "volume" | "battery") => {
        if (activePopup === popup) {
            setActivePopup(null);
        } else {
            setActivePopup(popup);
            setIsStartOpen(false); // Close start menu if open
        }
    }

    const toggleStart = () => {
        setIsStartOpen(!isStartOpen);
        setActivePopup(null); // Close other popups
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 h-12 bg-gray-900/80 backdrop-blur-md border-t border-gray-700/50 flex items-center justify-between px-2 z-[9999]">

            {/* Start Menu Popup */}
            {isStartOpen && <StartMenu onClose={() => setIsStartOpen(false)} />}

            {/* Start & Search */}
            <div className="flex items-center space-x-2">
                <button
                    className={`p-2 rounded-md transition-all duration-200 ${isStartOpen ? 'bg-purple-600 text-white' : 'hover:bg-gray-700/50 text-purple-400'}`}
                    onClick={toggleStart}
                >
                    <LayoutGrid size={24} />
                </button>

                <div
                    className="hidden sm:flex items-center bg-gray-800/50 rounded-full px-3 py-1.5 border border-gray-700/50 w-48 cursor-pointer hover:bg-gray-700/50 transition-colors"
                    onClick={toggleStart}
                >
                    <Search size={14} className="text-gray-400 mr-2" />
                    <span className="text-xs text-gray-400">Search...</span>
                </div>
            </div>

            {/* Active Apps */}
            <div className="flex-1 flex items-center justify-center space-x-2 px-4 overflow-x-auto no-scrollbar">
                {sortedWindows.map((win) => {
                    const isTop = Math.max(...windows.map(w => w.zIndex)) === win.zIndex;
                    const Icon = win.icon || LayoutGrid;

                    return (
                        <button
                            key={win.id}
                            onClick={() => handleWindowClick(win.id, win.isMinimized, isTop && !win.isMinimized)}
                            className={`
                group relative flex items-center justify-center p-2 rounded-lg transition-all duration-200
                ${win.isMinimized ? 'bg-transparent text-gray-500 hover:bg-gray-800' :
                                    isTop ? 'bg-gray-700/50 text-white shadow-sm ring-1 ring-white/10' : 'hover:bg-gray-800 text-gray-300'}
            `}
                            title={win.title}
                        >
                            <Icon size={20} />
                            {!win.isMinimized && (
                                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-400 rounded-full"></span>
                            )}
                        </button>
                    )
                })}
            </div>

            {/* System Tray */}
            <div className="flex items-center space-x-3 px-2 relative">
                {/* Popups */}
                {activePopup === "wifi" && <WifiPopup />}
                {activePopup === "volume" && <VolumePopup />}
                {activePopup === "battery" && <BatteryPopup />}

                <div className="hidden sm:flex items-center space-x-2 text-gray-400">
                    <ChevronUp size={16} className="hover:text-white cursor-pointer" />

                    <button
                        onClick={() => togglePopup("wifi")}
                        className={`p-1 rounded hover:bg-white/10 ${activePopup === "wifi" ? "text-blue-400 bg-white/10" : "hover:text-white"}`}
                    >
                        <Wifi size={16} />
                    </button>

                    <button
                        onClick={() => togglePopup("volume")}
                        className={`p-1 rounded hover:bg-white/10 ${activePopup === "volume" ? "text-purple-400 bg-white/10" : "hover:text-white"}`}
                    >
                        <Volume2 size={16} />
                    </button>

                    <button
                        onClick={() => togglePopup("battery")}
                        className={`p-1 rounded hover:bg-white/10 ${activePopup === "battery" ? "text-green-400 bg-white/10" : "hover:text-white"}`}
                    >
                        <Battery size={16} />
                    </button>
                </div>

                <div className="flex flex-col items-end text-right px-2 py-1 hover:bg-gray-800/50 rounded-md cursor-default border-l border-gray-700/30 pl-3 ml-2">
                    <span className="text-xs font-medium text-gray-200">{format(time, "HH:mm")}</span>
                    <span className="text-[10px] text-gray-400">{format(time, "dd/MM/yyyy")}</span>
                </div>
            </div>
        </div>
    );
}
