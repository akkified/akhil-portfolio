"use client";

import React from "react";
import { Code, Globe, Database, Smartphone, Terminal, Cpu } from "lucide-react";

export default function SkillsApp() {
    const skills = [
        {
            category: "Frontend",
            icon: Globe,
            color: "text-cyan-400",
            items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
        },
        {
            category: "Backend",
            icon: Terminal,
            color: "text-green-400",
            items: ["Python", "Java", "Node.js", "PostgreSQL", "MongoDB"]
        },
        {
            category: "Mobile",
            icon: Smartphone,
            color: "text-purple-400",
            items: ["Flutter", "iOS (Swift)", "Android (Kotlin)", "React Native"],
        },
        {
            category: "AI/ML",
            icon: Cpu,
            color: "text-rose-400",
            items: ["TensorFlow", "Keras", "PyTorch", "Unsloth", "OpenAI API"]
        },
    ];

    return (
        <div className="p-6 h-full bg-gray-900 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skillGroup, idx) => {
                    const Icon = skillGroup.icon;

                    return (
                        <div key={idx} className="bg-gray-800 border border-gray-700 rounded-xl p-5 hover:bg-gray-750 transition-colors group">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className={`p-2 rounded-lg bg-gray-700/50 group-hover:bg-gray-700 transition-colors ${skillGroup.color}`}>
                                    <Icon size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-100">{skillGroup.category}</h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {skillGroup.items.map(item => (
                                    <span key={item} className="px-2.5 py-1 bg-gray-900 border border-gray-700 rounded-md text-sm text-gray-300">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Terminal Style Decoration */}
            <div className="mt-8 p-4 bg-black rounded-lg font-mono text-sm text-green-400 border border-gray-800">
                <p className="typing-effect">
                    <span className="text-blue-400">user@akhil-os</span>:<span className="text-purple-400">~</span>$ echo "Learning never stops..."
                </p>
                <p className="mt-2 text-gray-500">Learning never stops...</p>
                <p className="mt-1">
                    <span className="text-blue-400">user@akhil-os</span>:<span className="text-purple-400">~</span>$ <span className="animate-pulse">_</span>
                </p>
            </div>
        </div>
    );
}
