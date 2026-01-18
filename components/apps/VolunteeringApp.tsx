"use client";

import React, { useState } from "react";
import { Search, Mic, X, Settings, Grid, MoreVertical, ImageIcon, Newspaper, MapPin, PlayCircle, ArrowLeft, ArrowRight, RotateCw, Lock, Star } from "lucide-react";

interface VolunteerActivity {
    id: string;
    role: string;
    organization: string;
    description: string;
    date: string;
}

const activities: VolunteerActivity[] = [
    {
        id: "love-for-elderly",
        role: "Founder",
        organization: "Love for Elderly",
        description: "Founded a nonprofit dedicated to combatting senior isolation. We organize card-writing campaigns and visits, bringing letters of love, warmth, and companionship to nursing homes. It's about bridging the generational gap with simple acts of kindness.",
        date: "Present"
    },
    {
        id: "pvsa-gold",
        role: "Gold Medalist",
        organization: "President's Volunteer Service Award",
        description: "Honored with two PVSA Gold Medals. This recognition reflects hundreds of hours dedicated to community service, but the real reward has been the smiles shared and the difference made.",
        date: "2x Recipient"
    },
    {
        id: "recycling-center",
        role: "Volunteer",
        organization: "Recycling Center",
        description: "Spent weekends over two years sorting materials and educating visitors. It taught me that sustainability starts with small, consistent local actions.",
        date: "2 Years"
    },
    {
        id: "community-art",
        role: "Volunteer",
        organization: "Community Art Shop",
        description: "Helped organize supplies and support local artists for a year. I loved seeing how creativity can be a powerful tool for community bonding.",
        date: "1 Year"
    }
];

const SimulatedWebsite = ({ activity, onBack }: { activity: VolunteerActivity; onBack: () => void }) => {
    return (
        <div className="flex flex-col h-full bg-white text-slate-800 animate-in fade-in zoom-in-95 duration-200">
            {/* Fake Browser Toolbar */}
            <div className="bg-slate-100 border-b border-slate-300 p-2 flex items-center gap-3 sticky top-0 z-20">
                <div className="flex gap-2">
                    <button onClick={onBack} className="p-1.5 hover:bg-slate-200 rounded-full transition-colors text-slate-600">
                        <ArrowLeft size={16} />
                    </button>
                    <button disabled className="p-1.5 opacity-30 rounded-full text-slate-600 cursor-not-allowed">
                        <ArrowRight size={16} />
                    </button>
                    <button className="p-1.5 hover:bg-slate-200 rounded-full transition-colors text-slate-600">
                        <RotateCw size={16} />
                    </button>
                </div>
                <div className="flex-1 bg-white border border-slate-300 rounded-full px-4 py-1.5 text-xs sm:text-sm text-slate-600 flex items-center gap-2 overflow-hidden">
                    <Lock size={12} className="text-green-600 flex-shrink-0" />
                    <span className="truncate">https://{activity.organization.toLowerCase().replace(/\s+/g, '')}.org</span>
                </div>
                <div className="flex gap-3 text-slate-600 px-1">
                    <Star size={16} />
                    <MoreVertical size={16} />
                </div>
            </div>

            {/* Website Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {/* Hero */}
                <div className="bg-slate-900 text-white py-16 px-6 sm:px-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-indigo-600/20 pattern-grid-lg opacity-30"></div>
                    <div className="relative z-10 max-w-3xl mx-auto space-y-4">
                        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">{activity.organization}</h1>
                        <p className="text-xl text-indigo-200 font-medium">{activity.role}</p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
                    <section className="prose prose-slate lg:prose-lg mx-auto">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h2>
                        <p className="text-lg leading-relaxed text-slate-600">
                            {activity.description}
                        </p>
                    </section>

                    <div className="grid sm:grid-cols-3 gap-6 pt-8 border-t border-slate-200">
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center">
                            <h3 className="text-3xl font-bold text-indigo-600 mb-2">{activity.date}</h3>
                            <p className="text-slate-500 font-medium uppercase text-xs tracking-wider">Duration / Status</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center">
                            <h3 className="text-3xl font-bold text-indigo-600 mb-2">Impact</h3>
                            <p className="text-slate-500 font-medium uppercase text-xs tracking-wider">Community Reach</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center">
                            <h3 className="text-3xl font-bold text-indigo-600 mb-2">Active</h3>
                            <p className="text-slate-500 font-medium uppercase text-xs tracking-wider">Engagement</p>
                        </div>
                    </div>
                </div>

                {/* Pseudo Footer */}
                <div className="bg-slate-100 py-12 border-t border-slate-200 mt-12">
                    <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
                        <p>&copy; {new Date().getFullYear()} {activity.organization}. All rights reserved.</p>
                        <div className="flex gap-6">
                            <span>Privacy Policy</span>
                            <span>Terms of Service</span>
                            <span>Contact Us</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function VolunteeringApp() {
    const [activePage, setActivePage] = useState<string | null>(null);

    const activeActivity = activities.find(a => a.id === activePage);

    if (activeActivity) {
        return <SimulatedWebsite activity={activeActivity} onBack={() => setActivePage(null)} />;
    }

    return (
        <div className="h-full bg-[#202124] text-[#bdc1c6] font-sans overflow-y-auto custom-scrollbar flex flex-col">
            {/* Header */}
            <div className="sticky top-0 bg-[#202124] z-10 border-b border-[#3c4043] pt-5 px-4 md:px-8">
                {/* Search Bar Row */}
                <div className="flex items-center gap-4 md:gap-8 mb-6">
                    <span className="text-2xl font-medium select-none hidden md:block">
                        <span className="text-[#4285f4]">G</span>
                        <span className="text-[#ea4335]">o</span>
                        <span className="text-[#fbbc05]">o</span>
                        <span className="text-[#4285f4]">g</span>
                        <span className="text-[#34a853]">l</span>
                        <span className="text-[#ea4335]">e</span>
                    </span>

                    <div className="flex-1 max-w-2xl bg-[#303134] rounded-full flex items-center px-4 py-2.5 shadow-sm border border-transparent hover:bg-[#303134] hover:shadow-md transition-shadow">
                        <Search size={18} className="text-[#9aa0a6] mr-4 text-xs" />
                        <span className="flex-1 text-white text-sm md:text-base outline-none bg-transparent">
                            Akhil Akella volunteering
                        </span>
                        <div className="flex items-center gap-3 border-l border-[#5f6368] pl-3 ml-2">
                            <X size={20} className="text-[#9aa0a6] cursor-pointer" />
                            <div className="hidden sm:flex border-l border-[#5f6368] h-5 mx-1"></div>
                            <Mic size={20} className="text-[#8ab4f8] hidden sm:block cursor-pointer" />
                            <Search size={20} className="text-[#8ab4f8] hidden sm:block cursor-pointer" />
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-4 ml-auto">
                        <Settings size={20} className="text-[#9aa0a6] cursor-pointer" />
                        <Grid size={20} className="text-[#9aa0a6] cursor-pointer" />
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium text-sm">
                            A
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-6 text-sm max-w-2xl md:ml-[108px] overflow-x-auto no-scrollbar">
                    <div className="pb-3 border-b-[3px] border-[#8ab4f8] text-[#8ab4f8] flex items-center gap-1 cursor-pointer whitespace-nowrap">
                        <Search size={16} /> All
                    </div>
                    <div className="pb-3 border-b-[3px] border-transparent hover:border-[#bdc1c6] text-[#9aa0a6] flex items-center gap-1 cursor-pointer whitespace-nowrap transition-colors">
                        <ImageIcon size={16} /> Images
                    </div>
                    <div className="pb-3 border-b-[3px] border-transparent hover:border-[#bdc1c6] text-[#9aa0a6] flex items-center gap-1 cursor-pointer whitespace-nowrap transition-colors">
                        <Newspaper size={16} /> News
                    </div>
                    <div className="pb-3 border-b-[3px] border-transparent hover:border-[#bdc1c6] text-[#9aa0a6] flex items-center gap-1 cursor-pointer whitespace-nowrap transition-colors">
                        <PlayCircle size={16} /> Videos
                    </div>
                    <div className="pb-3 border-b-[3px] border-transparent hover:border-[#bdc1c6] text-[#9aa0a6] flex items-center gap-1 cursor-pointer whitespace-nowrap transition-colors">
                        <MapPin size={16} /> Maps
                    </div>
                    <div className="pb-3 border-b-[3px] border-transparent hover:border-[#bdc1c6] text-[#9aa0a6] flex items-center gap-1 cursor-pointer whitespace-nowrap transition-colors">
                        <MoreVertical size={16} /> More
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-4 md:px-[140px] md:pt-6 max-w-4xl">
                <div className="text-[#9aa0a6] text-sm mb-6">
                    About {activities.length} results (0.42 seconds)
                </div>

                <div className="space-y-8">
                    {activities.map((activity) => (
                        <div key={activity.id} onClick={() => setActivePage(activity.id)} className="group cursor-pointer">
                            {/* URL/Breadcrumb */}
                            <div className="flex items-center gap-2 mb-1 text-sm text-[#dadce0]">
                                <div className="bg-[#303134] p-1.5 rounded-full">
                                    <Search size={12} className="text-[#9aa0a6]" />
                                </div>
                                <div className="flex flex-col leading-tight">
                                    <span className="text-[#dadce0] text-sm font-medium">Akhil Portfolio</span>
                                    <span className="text-[#bdc1c6] text-xs">
                                        https://akhil.portfolio &rsaquo; volunteering &rsaquo; {activity.id}
                                    </span>
                                </div>
                                <MoreVertical size={14} className="ml-auto text-[#9aa0a6]" />
                            </div>

                            {/* Title */}
                            <h3 className="text-[#8ab4f8] text-xl font-normal hover:underline mb-1">
                                {activity.role} - {activity.organization}
                            </h3>

                            {/* Snippet */}
                            <p className="text-[#bdc1c6] text-sm leading-relaxed max-w-2xl">
                                <span className="text-[#9aa0a6]">{activity.date} — </span>
                                {activity.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Related Searches */}
                <div className="mt-12 pt-8 border-t border-[#3c4043] max-w-2xl">
                    <h3 className="text-xl text-[#dadce0] mb-4">Related searches</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {["Software Engineering Projects", "Akhil Akella Resume", "Contact Information", "Skills and Expertise"].map((term) => (
                            <div key={term} className="bg-[#303134] p-3 rounded-full flex items-center gap-3 hover:bg-[#3c4043] transition-colors cursor-pointer">
                                <Search size={18} className="text-[#9aa0a6] ml-1" />
                                <span className="text-[#bdc1c6] text-sm font-medium">{term}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer-like spacing */}
                <div className="h-20"></div>
            </div>
        </div>
    );
}
