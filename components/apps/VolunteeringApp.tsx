"use client";

import React from "react";

interface VolunteerActivity {
    id: string;
    role: string;
    organization: string;
    description: string;
    date: string;
    size?: "normal" | "large";
}

const activities: VolunteerActivity[] = [
    {
        id: "1",
        role: "Founder",
        organization: "Love for Elderly",
        description: "Founded a nonprofit dedicated to combatting senior isolation. We organize card-writing campaigns and visits, bringing letters of love, warmth, and companionship to nursing homes. It's about bridging the generational gap with simple acts of kindness.",
        date: "Present",
        size: "large"
    },
    {
        id: "4",
        role: "Gold Medalist",
        organization: "President's Volunteer Service Award",
        description: "Honored with two PVSA Gold Medals. This recognition reflects hundreds of hours dedicated to community service, but the real reward has been the smiles shared and the difference made.",
        date: "2x Recipient",
        size: "large"
    },
    {
        id: "2",
        role: "Volunteer",
        organization: "Recycling Center",
        description: "Spent weekends over two years sorting materials and educating visitors. It taught me that sustainability starts with small, consistent local actions.",
        date: "2 Years",
        size: "normal"
    },
    {
        id: "3",
        role: "Volunteer",
        organization: "Community Art Shop",
        description: "Helped organize supplies and support local artists for a year. I loved seeing how creativity can be a powerful tool for community bonding.",
        date: "1 Year",
        size: "normal"
    }
];

export default function VolunteeringApp() {
    return (
        <div className="h-full bg-slate-900 text-white overflow-y-auto custom-scrollbar">
            {/* Hero Section */}
            <div className="relative p-8 pb-12 bg-gradient-to-b from-slate-800/50 to-transparent border-b border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <h2 className="text-sm font-bold tracking-wider text-indigo-400 uppercase flex items-center gap-2">
                            My Journey
                        </h2>
                    </div>

                    <h1 className="text-4xl font-bold text-slate-100 mb-4 leading-tight">
                        Service means helping others. <br />
                        <span className="text-slate-400">It's a core part of who I am.</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
                        I believe technology means nothing if it doesn't help people. My volunteering work grounds me and reminds me why I build things in the first place—to make life better for others.
                    </p>
                </div>
            </div>

            {/* Content Grid */}
            <div className="max-w-4xl mx-auto p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activities.map((activity) => (
                        <div
                            key={activity.id}
                            className={`
                                relative p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-500/30 group
                                ${activity.size === 'large' ? 'md:col-span-2' : 'md:col-span-1'}
                            `}
                        >
                            <div className="flex flex-col h-full">
                                <div className="flex items-start justify-between mb-4">
                                    <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-xs font-medium text-indigo-300 border border-indigo-500/20">
                                        {activity.date}
                                    </span>
                                </div>

                                <div className="mb-2">
                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors flex items-center gap-2">
                                        {activity.role}
                                    </h3>
                                    <div className="text-indigo-400 font-medium text-sm">
                                        {activity.organization}
                                    </div>
                                </div>

                                <p className="text-slate-300 leading-relaxed text-sm mt-auto">
                                    {activity.description}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Philosophy / Filler Card to balance grid or add touch */}
                    <div className="md:col-span-2 mt-4 p-8 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] text-center hover:bg-white/[0.04] transition-colors cursor-default">
                        <div className="flex flex-col items-center gap-4">
                            <p className="text-slate-400 italic font-medium max-w-lg">
                                "Service to others is the rent you pay for your room here on earth."
                            </p>
                            <span className="text-xs text-slate-600 uppercase tracking-widest font-bold">
                                Muhammad Ali
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
