"use client";

import React from "react";

export default function SkillsApp() {
    const [visibleStep, setVisibleStep] = React.useState(0);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const skills = [
        {
            category: "Frontend",
            items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
        },
        {
            category: "Backend",
            items: ["Python", "Java", "Node.js", "PostgreSQL", "MongoDB"]
        },
        {
            category: "Mobile",
            items: ["Flutter", "iOS (Swift)", "Android (Kotlin)", "React Native"]
        },
        {
            category: "AI/ML",
            items: ["TensorFlow", "Keras", "PyTorch", "Unsloth", "OpenAI API", "LoRA", "QLoRA", "OpenCV", "RLVR", "NumPy", "CNNs", "PID"]
        },
    ];

    // Total steps: 4 header lines + 4 skill groups + 1 footer = 9 steps (0-8)
    React.useEffect(() => {
        const delays = [
            500, // 0: Login
            300, // 1: Command
            600, // 2: Init
            600, // 3: Loading
            500, // 4: Access Granted
            400, // 5: Frontend
            400, // 6: Backend
            400, // 7: Mobile
            400, // 8: AI/ML
            500  // 9: Footer
        ];

        let timeout: NodeJS.Timeout;
        if (visibleStep < delays.length) {
            timeout = setTimeout(() => {
                setVisibleStep(prev => prev + 1);
            }, delays[visibleStep]);
        }

        return () => clearTimeout(timeout);
    }, [visibleStep]);

    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [visibleStep]);

    return (
        <div ref={scrollRef} className="h-full bg-slate-950 text-green-400 font-mono p-6 overflow-y-auto custom-scrollbar selection:bg-green-500/30 selection:text-green-100">
            <div className="max-w-3xl">
                {/* Header */}
                <div className="mb-6 space-y-1">
                    {visibleStep >= 0 && <p className="text-slate-500 mb-2">Last login: {new Date().toDateString()} on ttys001</p>}
                    {visibleStep >= 1 && (
                        <p>
                            <span className="text-blue-400 font-bold">user@akhil-portfolio</span>
                            <span className="text-slate-400">:</span>
                            <span className="text-purple-400 font-bold">~/skills</span>
                            <span className="text-slate-400">$</span> ./display_skills.sh --verbose
                        </p>
                    )}
                    {visibleStep >= 2 && <p className="text-slate-400 italic">&#62;&#62; Initializing skill matrix...</p>}
                    {visibleStep >= 3 && <p className="text-slate-400 italic">&#62;&#62; Loading modules...</p>}
                    {visibleStep >= 4 && <p className="text-green-500 font-bold mt-2">ACCESS GRANTED.</p>}
                </div>

                {/* Skills Output */}
                <div className="grid gap-8 my-8">
                    {skills.map((group, idx) => (
                        visibleStep >= (5 + idx) && (
                            <div key={idx} className="relative animate-in slide-in-from-left-2 duration-300 fade-in">
                                <h3 className="text-yellow-400 font-bold mb-3 border-b border-gray-800 pb-1 inline-block">
                                    [{group.category}]
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4 border-l-2 border-slate-800">
                                    {group.items.map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 group cursor-default hover:text-green-300 transition-colors">
                                            <span className="text-slate-600 opacity-50 group-hover:text-green-500 group-hover:opacity-100 transition-all">➜</span>
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </div>

                {/* Footer Prompt */}
                {visibleStep >= 9 && (
                    <div className="mt-8 pt-4 border-t border-slate-800 animate-in fade-in duration-500">
                        <p className="mb-2 text-slate-500">
                            Total Modules Loaded: {skills.reduce((acc, curr) => acc + curr.items.length, 0)}
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="text-blue-400 font-bold">user@akhil-portfolio</span>
                            <span className="text-slate-400">:</span>
                            <span className="text-purple-400 font-bold">~/skills</span>
                            <span className="text-slate-400">$</span>
                            <span className="w-3 h-5 bg-green-500 block animate-pulse"></span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
