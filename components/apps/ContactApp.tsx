"use client";

import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactApp() {
    return (
        <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white p-6 md:p-12 overflow-y-auto selection:bg-indigo-500/30">
            <div className="max-w-3xl mx-auto w-full space-y-8">
                <div className="text-center space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex p-4 bg-white/5 border border-white/10 rounded-full text-indigo-400 mb-2 backdrop-blur-sm shadow-xl shadow-indigo-500/10">
                        <Mail size={32} />
                    </div>
                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Get In Touch</h2>
                    <p className="text-slate-400 max-w-lg mx-auto text-lg leading-relaxed">
                        I'm always open to discussing new opportunities, collaborations, or
                        just having a chat about technology!
                    </p>
                </div>

                <div className="mt-8 max-w-xl mx-auto space-y-4">
                    {/* Email */}
                    <div className="group bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg backdrop-blur-sm">
                        <div className="flex items-center space-x-5">
                            <div className="p-4 bg-blue-500/10 rounded-xl text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Email</h3>
                                <a href="mailto:akki.akella@gmail.com" className="text-xl font-medium text-slate-200 hover:text-white transition-colors">
                                    akki.akella@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="group bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg backdrop-blur-sm">
                        <div className="flex items-center space-x-5">
                            <div className="p-4 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Phone</h3>
                                <a href="tel:+14707741985" className="text-xl font-medium text-slate-200 hover:text-white transition-colors">
                                    +1 (470) 774-1985
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="group bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg backdrop-blur-sm">
                        <div className="flex items-center space-x-5">
                            <div className="p-4 bg-emerald-500/10 rounded-xl text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Location</h3>
                                <p className="text-xl font-medium text-slate-200">
                                    Georgia, USA
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
