"use client";

import React from "react";
import { MousePointer2, Grid, HelpCircle } from "lucide-react";

export default function WelcomeApp() {
    return (
        <div className="h-full bg-slate-900 text-white p-8 flex flex-col items-center justify-center text-center overflow-y-auto">
            <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <HelpCircle size={40} className="text-indigo-400" />
            </div>

            <h1 className="text-3xl font-bold mb-4">Welcome to My Portfolio</h1>

            <p className="text-slate-300 max-w-md leading-relaxed mb-8">
                This isn't your typical website. It's a simulated <strong>Operating System</strong> designed to showcase my work and journey.
            </p>

            <div className="grid gap-6 w-full max-w-lg">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center gap-4 text-left">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                        <MousePointer2 size={24} className="text-blue-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-100">Single Click</h3>
                        <p className="text-sm text-slate-400">Click any icon once to open an app.</p>
                    </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center gap-4 text-left">
                    <div className="p-3 bg-purple-500/20 rounded-lg">
                        <Grid size={24} className="text-purple-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-100">Taskbar</h3>
                        <p className="text-sm text-slate-400">Manage open windows and control settings like music at the bottom.</p>
                    </div>
                </div>
            </div>

            <p className="mt-8 text-xs text-slate-500 uppercase tracking-widest font-bold">
                Enjoy your stay
            </p>
        </div>
    );
}
