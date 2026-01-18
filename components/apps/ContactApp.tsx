"use client";

import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactApp() {
    return (
        <div className="flex flex-col h-full bg-gray-900 text-white p-6 md:p-12 overflow-y-auto">
            <div className="max-w-3xl mx-auto w-full space-y-8">
                <div className="text-center space-y-3">
                    <div className="inline-flex p-3 bg-purple-500/10 rounded-full text-purple-400 mb-2">
                        <Mail size={32} />
                    </div>
                    <h2 className="text-3xl font-bold">Get In Touch</h2>
                    <p className="text-gray-400 max-w-lg mx-auto">
                        I'm always open to discussing new opportunities, collaborations, or
                        just having a chat about technology!
                    </p>
                </div>

                <div className="mt-8 max-w-xl mx-auto space-y-4">
                    {/* Email */}
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:bg-gray-800 transition-colors">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-400">Email</h3>
                                <a href="mailto:akki.akella@gmail.com" className="text-white hover:text-purple-400 transition-colors">
                                    akki.akella@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:bg-gray-800 transition-colors">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400">
                                <Phone size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-400">Phone</h3>
                                <a href="tel:+14707741985" className="text-white hover:text-indigo-400 transition-colors">
                                    +1 (470) 774-1985
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:bg-gray-800 transition-colors">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-green-500/10 rounded-lg text-green-400">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-400">Location</h3>
                                <p className="text-white">
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
