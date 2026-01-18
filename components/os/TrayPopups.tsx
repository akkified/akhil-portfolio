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

export const VolumePopup = () => {
    const [isPlaying, setIsPlaying] = React.useState(false); // Start false, effect will play
    const [progress, setProgress] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const audioRef = React.useRef<HTMLAudioElement | null>(null);

    React.useEffect(() => {
        const audio = new Audio("/street_lights.mp3");
        audioRef.current = audio;

        const updateProgress = () => setProgress(audio.currentTime);
        const setAudioDuration = () => setDuration(audio.duration);

        audio.addEventListener("timeupdate", updateProgress);
        audio.addEventListener("loadedmetadata", setAudioDuration);

        // Auto-play on mount
        audio.play()
            .then(() => setIsPlaying(true))
            .catch(e => console.error("Auto-play failed:", e));

        return () => {
            audio.pause();
            audio.removeEventListener("timeupdate", updateProgress);
            audio.removeEventListener("loadedmetadata", setAudioDuration);
        };
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!audioRef.current) return;
        const time = Number(e.target.value);
        audioRef.current.currentTime = time;
        setProgress(time);
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="absolute bottom-12 right-0 w-80 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-xl p-4 shadow-2xl animate-in slide-in-from-bottom-2 fade-in duration-200 overflow-hidden">
            {/* Album Art Background Blur */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-900/40 pointer-events-none"></div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-medium flex items-center gap-2">
                        <Volume2 size={16} />
                        <span>Now Playing</span>
                    </h3>
                </div>

                {/* Player UI */}
                <div className="flex flex-col items-center space-y-4">
                    {/* Album Art */}
                    <div className="w-40 h-40 rounded-lg shadow-2xl overflow-hidden relative group">
                        <img
                            src="/808salbumcover.png"
                            alt="808s & Heartbreak"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Track Info */}
                    <div className="text-center space-y-1">
                        <h4 className="text-white font-bold text-lg leading-none">Street Lights</h4>
                        <p className="text-gray-400 text-sm">Kanye West</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full space-y-1">
                        <input
                            type="range"
                            min={0}
                            max={duration || 100}
                            value={progress}
                            onChange={handleSeek}
                            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-110 transition-all accent-purple-500"
                        />
                        <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                            <span>{formatTime(progress)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-6">
                        <button className="text-gray-400 hover:text-white transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
                        </button>

                        <button
                            onClick={togglePlay}
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-white/10"
                        >
                            {isPlaying ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                            )}
                        </button>

                        <button className="text-gray-400 hover:text-white transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
                        </button>
                    </div>
                </div>

                {/* Volume Slider Mini */}
                <div className="mt-6 flex items-center gap-3 px-2 opacity-50 hover:opacity-100 transition-opacity">
                    <Volume2 size={14} className="text-gray-400" />
                    <div className="flex-1 h-1 bg-gray-700 rounded-full">
                        <div className="h-full w-[75%] bg-gray-400 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

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
