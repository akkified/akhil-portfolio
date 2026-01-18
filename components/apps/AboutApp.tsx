"use client";

import React from "react";
import { Download, Mail, Github, Linkedin } from "lucide-react";

export default function AboutApp() {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-[200px_1fr] gap-8">
                {/* Profile Sidebar */}
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <img
                            src="pfp.png"
                            alt="Akhil Akella"
                            className="relative w-40 h-40 rounded-full border-2 border-gray-800 object-cover bg-gray-600"
                        />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-white">Akhil Akella</h2>
                        <p className="text-purple-400 font-medium">Full Stack Developer</p>
                    </div>

                    <div className="flex space-x-3">
                        <a
                            href="https://github.com/akkified"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 hover:text-white transition-colors text-gray-400"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/akhil-akella-149215331/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 hover:text-white transition-colors text-gray-400"
                        >
                            <Linkedin size={20} />
                        </a>
                        <a
                            href="mailto:akki.akella@gmail.com"
                            className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 hover:text-white transition-colors text-gray-400"
                        >
                            <Mail size={20} />
                        </a>
                    </div>

                    <a
                        href="resume.pdf"
                        download="Akhil_Akella_Resume.pdf"
                        className="w-full flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-all text-sm font-medium shadow-lg shadow-purple-900/20"
                    >
                        <Download size={16} />
                        <span>Resume</span>
                    </a>
                </div>

                {/* Content */}
                <div className="space-y-8">
                    <section>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4">
                            Hi, I'm Akhil.
                        </h1>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            I'm a sophomore at the Alliance Academy of Innovation with a
                            passion for full-stack development and emerging technologies. I
                            love solving complex problems and turning ideas into reality
                            through code.
                        </p>
                        <p className="text-gray-300 leading-relaxed mt-4">
                            When I'm not coding, you can find me exploring the latest trends
                            in web development and AI.
                        </p>
                    </section>

                    <section className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                            <h3 className="text-3xl font-bold text-purple-400 mb-1">5+</h3>
                            <p className="text-gray-400 text-sm">Projects Completed</p>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                            <h3 className="text-3xl font-bold text-purple-400 mb-1">4.375</h3>
                            <p className="text-gray-400 text-sm">GPA</p>
                        </div>
                    </section>

                    <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/30">
                        <h3 className="text-lg font-semibold text-white mb-2">Current Focus</h3>
                        <p className="text-gray-400">
                            Exploring Agentic AI workflows and building OS-like web interfaces.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
