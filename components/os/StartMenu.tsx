"use client";

import React, { useState, useEffect, useRef } from "react";
import { Power, User, UserCircle, FolderOpen, Terminal, Mail, Search, HandHeart, HelpCircle } from "lucide-react";
import { useWindow } from "./WindowContext";
import AboutApp from "@/components/apps/AboutApp";
import ProjectsApp from "@/components/apps/ProjectsApp";
import SkillsApp from "@/components/apps/SkillsApp";
import ContactApp from "@/components/apps/ContactApp";
import VolunteeringApp from "@/components/apps/VolunteeringApp";
import WelcomeApp from "@/components/apps/WelcomeApp";

interface AppItem {
    id: string;
    title: string;
    component: React.ReactNode;
    icon: any;
    color: string;
}

export default function StartMenu({ onClose }: { onClose: () => void }) {
    const { openWindow } = useWindow();
    const [searchQuery, setSearchQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const apps: AppItem[] = [
        { id: 'about', title: 'Bio', component: <AboutApp />, icon: UserCircle, color: 'from-gray-500 to-gray-700' },
        { id: 'projects', title: 'Projects', component: <ProjectsApp />, icon: FolderOpen, color: 'from-yellow-400 to-yellow-600' },
        { id: 'skills', title: 'Skills', component: <SkillsApp />, icon: Terminal, color: 'from-gray-800 to-black' },
        { id: 'contact', title: 'Contact', component: <ContactApp />, icon: Mail, color: 'from-blue-500 to-blue-600' },
        { id: 'volunteering', title: 'Volunteering', component: <VolunteeringApp />, icon: HandHeart, color: 'from-red-400 to-red-600' },
        { id: 'welcome', title: 'Welcome Guide', component: <WelcomeApp />, icon: HelpCircle, color: 'from-purple-500 to-purple-700' },
    ];

    const filteredApps = apps.filter(app => 
        app.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        // Auto-focus input on mount
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleAppClick = (app: AppItem) => {
        openWindow(app.id, app.title, app.component, app.icon);
        onClose();
    };

    return (
        <div className="absolute bottom-12 left-2 w-80 bg-gray-900/95 backdrop-blur-lg border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-2 fade-in duration-200 z-50 flex flex-col max-h-[500px]">
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
                        ref={inputRef}
                        type="text"
                        placeholder="Search apps..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md py-1.5 pl-9 pr-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                    />
                </div>
            </div>

            {/* Apps List */}
            <div className="p-2 space-y-1 flex-1 overflow-y-auto custom-scrollbar">
                <p className="px-2 py-1 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                    {searchQuery ? 'Search Results' : 'Pinned'}
                </p>

                {filteredApps.length > 0 ? (
                    filteredApps.map((app) => (
                        <button
                            key={app.id}
                            onClick={() => handleAppClick(app)}
                            className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors group text-left"
                        >
                            <div className={`p-2 bg-gradient-to-br ${app.color} rounded-lg shadow-sm`}>
                                <app.icon size={18} className="text-white" />
                            </div>
                            <span className="text-sm text-gray-200 font-medium">{app.title}</span>
                        </button>
                    ))
                ) : (
                    <div className="p-4 text-center text-gray-400 text-xs">
                        No apps found.
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="p-3 bg-gray-950/50 border-t border-gray-700/50 flex justify-between items-center shrink-0">
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
