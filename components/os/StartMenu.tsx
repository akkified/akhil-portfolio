"use client";

import React from "react";
import { Power, User, UserCircle, FolderOpen, Terminal, Mail, Search } from "lucide-react";
import { useWindow } from "./WindowContext";
import AboutApp from "@/components/apps/AboutApp";
import ProjectsApp from "@/components/apps/ProjectsApp";
import SkillsApp from "@/components/apps/SkillsApp";
import ContactApp from "@/components/apps/ContactApp";

export default function StartMenu({ onClose }: { onClose: () => void }) {
    const { openWindow } = useWindow();

    const handleAppClick = (id: string, title: string, content: React.ReactNode, icon: any) => {
        openWindow(id, title, content, icon);
        onClose();
    };

    return (
        <div className="absolute bottom-12 left-2 w-80 bg-gray-900/95 backdrop-blur-lg border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-2 fade-in duration-200 z-50 flex flex-col">
            {/* Profile Header */}
            <div className="p-4 border-b border-gray-700/50 bg-gray-800/30">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-[1px]">
                        <img src="pfp.png" alt="Profile" className="w-full h-full rounded-full object-cover border-2 border-gray-900" />
                    </div>
                    <div>
                        <h3 className="text-white font-medium">active_user</h3>
                        <p className="text-xs text-gray-400">Admin</p>
                    </div>
                </div>
                {/* Search */}
                <div className="mt-4 relative">
                    <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search apps..."
                        className="w-full bg-gray-800 border border-gray-700 rounded-md py-1.5 pl-9 pr-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                    />
                </div>
            </div>

            {/* Pinned Apps */}
            <div className="p-2 space-y-1 flex-1">
                <p className="px-2 py-1 text-xs text-gray-500 uppercase tracking-wider font-semibold">Pinned</p>

                <button
                    onClick={() => handleAppClick('about', 'Bio', <AboutApp />, UserCircle)}
                    className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors group text-left"
                >
                    <div className="p-2 bg-gradient-to-br from-gray-500 to-gray-700 rounded-lg shadow-sm">
                        <UserCircle size={18} className="text-white" />
                    </div>
                    <span className="text-sm text-gray-200 font-medium">Bio</span>
                </button>

                <button
                    onClick={() => handleAppClick('projects', 'Projects', <ProjectsApp />, FolderOpen)}
                    className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors group text-left"
                >
                    <div className="p-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg shadow-sm">
                        <FolderOpen size={18} className="text-white" />
                    </div>
                    <span className="text-sm text-gray-200 font-medium">Projects</span>
                </button>

                <button
                    onClick={() => handleAppClick('skills', 'Skills', <SkillsApp />, Terminal)}
                    className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors group text-left"
                >
                    <div className="p-2 bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-sm">
                        <Terminal size={18} className="text-white" />
                    </div>
                    <span className="text-sm text-gray-200 font-medium">Skills</span>
                </button>

                <button
                    onClick={() => handleAppClick('contact', 'Contact', <ContactApp />, Mail)}
                    className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors group text-left"
                >
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm">
                        <Mail size={18} className="text-white" />
                    </div>
                    <span className="text-sm text-gray-200 font-medium">Contact</span>
                </button>
            </div>

            {/* Footer Actions */}
            <div className="p-3 bg-gray-950/50 border-t border-gray-700/50 flex justify-between items-center">
                <button className="flex items-center space-x-2 px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors text-xs text-gray-400">
                    <User size={14} />
                    <span>Sign Out</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-1.5 rounded-md hover:bg-red-500/20 hover:text-red-400 transition-colors text-xs text-gray-400 group">
                    <Power size={14} />
                    <span className="group-hover:text-red-400 transition-colors">Shut Down</span>
                </button>
            </div>
        </div>
    );
}
