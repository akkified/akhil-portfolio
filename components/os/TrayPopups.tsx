"use client";

import React from "react";
import { Wifi, Volume2, Battery, Settings, Power } from "lucide-react";

export const WifiPopup = () => (
    <div className="absolute bottom-12 right-0 w-64 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-xl p-4 shadow-2xl animate-in slide-in-from-bottom-2 fade-in duration-200">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Wi-Fi</h3>
            <div className="bg-blue-600 px-2 py-0.5 rounded text-xs text-white">Connected</div>
        </div>
        <div className="space-y-2">
            <div className="flex items-center space-x-3 p-2 bg-white/10 rounded-lg">
                <Wifi size={18} className="text-blue-400" />
                <div className="flex-1">
                    <p className="text-sm text-white font-medium">Akki_Portfolio_5G</p>
                    <p className="text-xs text-gray-400">Connected, secure</p>
                </div>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-default opacity-50">
                <Wifi size={18} className="text-gray-400" />
                <div className="flex-1">
                    <p className="text-sm text-gray-300">Guest_Network</p>
                    <p className="text-xs text-gray-500">Locked</p>
                </div>
            </div>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-700/50 flex justify-between items-center text-xs text-gray-400">
            <span>Network Settings</span>
            <Settings size={14} className="hover:text-white cursor-pointer" />
        </div>
    </div>
);

export const VolumePopup = () => (
    <div className="absolute bottom-12 right-0 w-64 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-xl p-4 shadow-2xl animate-in slide-in-from-bottom-2 fade-in duration-200">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Sound</h3>
        </div>

        <div className="space-y-4">
            {/* Slider visual */}
            <div className="flex items-center space-x-3">
                <Volume2 size={20} className="text-gray-400" />
                <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-[75%] bg-purple-500 rounded-full"></div>
                </div>
                <span className="text-xs text-gray-400">75%</span>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-3 flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-900/50 rounded-md flex items-center justify-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
                </div>
                <div>
                    <p className="text-sm text-white">Lo-fi Coding Beats</p>
                    <p className="text-xs text-purple-400">Now Playing</p>
                </div>
            </div>
        </div>
    </div>
);

export const BatteryPopup = () => (
    <div className="absolute bottom-12 right-0 w-64 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-xl p-4 shadow-2xl animate-in slide-in-from-bottom-2 fade-in duration-200">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Battery</h3>
            <span className="text-green-400 text-sm font-medium">100%</span>
        </div>

        <div className="flex items-center space-x-4 mb-4">
            <Battery size={32} className="text-green-400" />
            <div className="flex-1">
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-green-500 rounded-full"></div>
                </div>
                <p className="text-xs text-gray-400 mt-1">Fully Charged</p>
            </div>
        </div>

        <div className="pt-3 border-t border-gray-700/50">
            <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Power size={14} className="text-yellow-400" />
                <span>Power Mode: Performance</span>
            </div>
        </div>
    </div>
);
