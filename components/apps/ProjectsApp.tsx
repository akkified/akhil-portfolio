"use client";

import React, { useState } from "react";
import {
    Folder,
    FileCode,
    ExternalLink,
    Github,
    ChevronRight,
    Heart,
    ShoppingBag,
    Terminal,
    Zap,
    Brain,
    Activity,
    Glasses,
    Search,
    LayoutGrid,
    List,
    Globe
} from "lucide-react";

type Project = {
    name: string;
    type: string;
    description: string;
    tech: string[];
    github: string;
    demo: string;
    image: string;
    icon: React.ElementType;
    gradient: string;
    impact: string;
};

// Project Data with specific icons and gradients
const webProjects: Project[] = [
    {
        name: "PaperHearts",
        type: "Full Stack",
        description: "Donations and blog platform built with Next.js. Features user auth and payments.",
        tech: ["Next.js", "TypeScript", "Tailwind", "Givebutter"],
        github: "https://github.com/akkified/paperhearts",
        demo: "https://paperhearts-azure.vercel.app/",
        image: "/placeholder.svg",
        icon: Heart,
        gradient: "from-pink-500 to-rose-500",
        impact: "Facilitates seamless emotional and financial support for content creators, fostering a kinder online community."
    },
    {
        name: "Dakae LLC",
        type: "E-Commerce",
        description: "Exclusive product platform with chatbot and guides. Requires login/payment.",
        tech: ["React", "Node.js", "MongoDB", "Socket.io"],
        github: "https://github.com/dakaeshop/hustle-guide-dakae",
        demo: "https://hustle-guide-dakae.vercel.app/",
        image: "/placeholder.svg",
        icon: ShoppingBag,
        gradient: "from-orange-400 to-amber-500",
        impact: "Empowers entrepreneurs with exclusive resources and real-time support to accelerate their business growth."
    },
    {
        name: "Portfolio V2",
        type: "Personal",
        description: "The OS-style portfolio you are looking at right now!",
        tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
        github: "https://github.com/akkified/akhil-portfolio",
        demo: "https://akhilakella.vercel.app/",
        image: "/placeholder.svg",
        icon: Terminal,
        gradient: "from-blue-500 to-cyan-500",
        impact: "Provides a unique, interactive experience that redefines how personal portfolios can engage and inform visitors."
    },
];

const mobileProjects: Project[] = [
    {
        name: "StudentSparks",
        type: "Productivity",
        description: "Task management app with real-time sync and collaboration.",
        tech: ["React Native", "Firebase", "Redux"],
        github: "#",
        demo: "#",
        image: "/placeholder.svg",
        icon: Zap,
        gradient: "from-yellow-400 to-orange-500",
        impact: "Boosts student productivity and teamwork by streamlining task management and real-time collaboration."
    },
];

const dataProjects: Project[] = [
    {
        name: "LLM Fine-Tuning",
        type: "AI Research",
        description: "Fine-tuning large language models using Unsloth findings.",
        tech: ["Python", "Unsloth", "PyTorch"],
        github: "#",
        demo: "#",
        image: "/placeholder.svg",
        icon: Brain,
        gradient: "from-violet-500 to-purple-500",
        impact: "Advances the accessibility and efficiency of AI models, making powerful language processing tools more available."
    },
    {
        name: "Stroke Prediction",
        type: "Healthcare ML",
        description: "Predicting stroke probability based on MRI scan data.",
        tech: ["TensorFlow", "Keras", "Pandas"],
        github: "https://github.com/akkified/stroke-classification",
        demo: "https://huggingface.co/spaces/bakhili/stroke-classification",
        image: "/placeholder.svg",
        icon: Activity,
        gradient: "from-red-500 to-pink-600",
        impact: "Aids in early diagnosis and prevention of strokes, potentially saving lives through timely medical intervention."
    },
];

const etcProjects: Project[] = [
    {
        name: "Vision Goggles",
        type: "Hardware",
        description: "Smart goggles for the visually impaired with object detection.",
        tech: ["Raspberry Pi", "OpenCV", "Arduino"],
        github: "#",
        demo: "#",
        image: "/placeholder.svg",
        icon: Glasses,
        gradient: "from-gray-600 to-gray-800",
        impact: "Enhances independence and safety for the visually impaired by providing real-time auditory feedback on their surroundings."
    }
];

const categories = [
    { id: 'web', name: 'Web Dev', icon: Folder, data: webProjects },
    { id: 'mobile', name: 'Mobile', icon: Folder, data: mobileProjects },
    { id: 'ml', name: 'AI / ML', icon: Folder, data: dataProjects },
    { id: 'misc', name: 'Hardware', icon: Folder, data: etcProjects },
];

export default function ProjectsApp() {
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <div className="flex h-full bg-[#1e1e1e] text-gray-300 font-sans selection:bg-blue-500/30">
            {/* Sidebar (Explorer) */}
            <div className="w-56 bg-[#252526] border-r border-[#333] flex flex-col">
                <div className="p-3 text-xs font-bold text-gray-500 uppercase tracking-widest px-4">
                    Explorer
                </div>
                <div className="flex-1 overflow-y-auto">
                    {categories.map(cat => (
                        <div key={cat.id}>
                            <button
                                onClick={() => {
                                    setActiveCategory(cat);
                                    setSelectedProject(null);
                                }}
                                className={`
                                    w-full flex items-center space-x-2 px-3 py-1.5 text-sm border-l-2 transition-colors
                                    ${activeCategory.id === cat.id
                                        ? 'bg-[#37373d] text-white border-blue-400'
                                        : 'border-transparent text-gray-400 hover:bg-[#2a2d2e] hover:text-gray-200'}
                                `}
                            >
                                <cat.icon size={16} className={activeCategory.id === cat.id ? "text-blue-400" : "text-yellow-600"} />
                                <span>{cat.name}</span>
                            </button>
                            {/* Nested Items Visual (Tree view vibe) */}
                            {activeCategory.id === cat.id && (
                                <div className="ml-5 border-l border-[#444]">
                                    {cat.data.map(proj => (
                                        <button
                                            key={proj.name}
                                            onClick={() => setSelectedProject(proj)}
                                            className={`
                                                flex items-center space-x-2 px-3 py-1 text-xs w-full text-left transition-colors
                                                ${selectedProject?.name === proj.name ? 'text-blue-300 bg-[#37373d]' : 'text-gray-500 hover:text-gray-300'}
                                            `}
                                        >
                                            <proj.icon size={12} />
                                            <span className="truncate">{proj.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e]">
                {/* Header / Tabs */}
                <div className="h-9 bg-[#2d2d2d] flex items-center px-4 border-b border-[#111] shadow-sm">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span className="text-blue-400 font-medium">projects</span>
                        <ChevronRight size={14} />
                        <span>{activeCategory.name}</span>
                        {selectedProject && (
                            <>
                                <ChevronRight size={14} />
                                <span className="text-white flex items-center space-x-1">
                                    <selectedProject.icon size={12} className="text-blue-400" />
                                    <span>{selectedProject.name}</span>
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    {!selectedProject ? (
                        /* Grid View */
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                                <Folder size={20} className="text-yellow-600" />
                                <span>{activeCategory.name} Projects</span>
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {activeCategory.data.map((project, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedProject(project)}
                                        className="group relative flex flex-col items-start p-4 bg-[#252526] hover:bg-[#2a2d2e] border border-[#333] hover:border-blue-500/50 rounded-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-1 text-left"
                                    >
                                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                            <project.icon size={24} className="text-white" />
                                        </div>
                                        <h3 className="font-semibold text-gray-100 mb-1 group-hover:text-blue-400 transition-colors">
                                            {project.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 mb-3">{project.type}</p>
                                        <div className="flex flex-wrap gap-1 mt-auto">
                                            {project.tech.slice(0, 3).map(t => (
                                                <span key={t} className="text-[10px] bg-[#1e1e1e] px-1.5 py-0.5 rounded text-gray-400 border border-[#333]">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* Detail View - README Style */
                        <div className="max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-200">
                            {/* Project Header */}
                            <div className="border-b border-gray-700 pb-6 mb-8 flex items-start justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedProject.gradient} flex items-center justify-center shadow-2xl`}>
                                        <selectedProject.icon size={32} className="text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold text-white mb-1">{selectedProject.name}</h1>
                                        <p className="text-blue-400 font-medium">{selectedProject.type}</p>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    {selectedProject.demo && selectedProject.demo !== "#" && (
                                        <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2">
                                            <ExternalLink size={16} />
                                            <span>Run Demo</span>
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="grid md:grid-cols-[1fr_250px] gap-8">
                                <div className="space-y-6">
                                    <div className="prose prose-invert max-w-none">
                                        <h3 className="text-lg font-semibold text-gray-200 mb-2">About</h3>
                                        <p className="text-gray-400 leading-relaxed text-sm">
                                            {selectedProject.description}
                                        </p>

                                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mt-6">
                                            <h4 className="text-blue-400 font-semibold mb-1 flex items-center space-x-2">
                                                <Globe size={16} />
                                                <span>Impact on Society</span>
                                            </h4>
                                            <p className="text-gray-300 text-sm italic">
                                                "{selectedProject.impact}"
                                            </p>
                                        </div>
                                    </div>

                                    {/* Mock Code Snippet */}
                                    <div className="bg-[#1e1e1e] border border-[#333] rounded-lg p-4 font-mono text-xs overflow-hidden">
                                        <div className="flex items-center justify-between mb-2 text-gray-500">
                                            <span>package.json</span>
                                            <span className="text-[10px]">Read-only</span>
                                        </div>
                                        <div className="text-blue-400">"name"<span className="text-gray-400">: </span><span className="text-orange-400">"{selectedProject.name.toLowerCase().replace(/\s/g, "-")}"</span><span className="text-gray-400">,</span></div>
                                        <div className="text-blue-400">"version"<span className="text-gray-400">: </span><span className="text-orange-400">"1.0.0"</span><span className="text-gray-400">,</span></div>
                                        <div className="text-blue-400">"dependencies"<span className="text-gray-400">: {"{"}</span></div>
                                        {selectedProject.tech.map(t => (
                                            <div key={t} className="pl-4">
                                                <span className="text-green-400">"{t.toLowerCase()}"</span><span className="text-gray-400">: </span><span className="text-orange-400">"Latest"</span>
                                            </div>
                                        ))}
                                        <div className="text-gray-400">{"}"}</div>
                                    </div>
                                </div>

                                {/* Sidebar Info */}
                                <div className="space-y-6">
                                    <div className="bg-[#252526] p-4 rounded-lg border border-[#333]">
                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Links</h4>
                                        <div className="space-y-2">
                                            {selectedProject.github && selectedProject.github !== "#" && (
                                                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white hover:underline transition-all">
                                                    <Github size={14} />
                                                    <span>GitHub Repo</span>
                                                </a>
                                            )}
                                            {selectedProject.demo && selectedProject.demo !== "#" && (
                                                <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white hover:underline transition-all">
                                                    <ExternalLink size={14} />
                                                    <span>Live Preview</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-[#252526] p-4 rounded-lg border border-[#333]">
                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Stack</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.tech.map(t => (
                                                <span key={t} className="px-2 py-1 bg-[#333] hover:bg-[#444] rounded text-xs text-gray-300 transition-colors cursor-default">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
