"use client";

import React from "react";
import { WindowProvider } from "@/components/os/WindowContext";
import Desktop from "@/components/os/Desktop";
import DesktopIcon from "@/components/os/DesktopIcon";
import AboutApp from "@/components/apps/AboutApp";
import ProjectsApp from "@/components/apps/ProjectsApp";
import SkillsApp from "@/components/apps/SkillsApp";
import ContactApp from "@/components/apps/ContactApp";
import VolunteeringApp from "@/components/apps/VolunteeringApp";
import { UserCircle, FolderOpen, Terminal, Mail, Github, Users, HandHeart } from "lucide-react";

export default function Home() {
  return (
    <WindowProvider>
      <main className="h-screen w-screen overflow-hidden">
        <Desktop>
          {/* About Me -> "User Profile / System Info" */}
          <DesktopIcon
            id="about"
            title="Bio"
            icon={UserCircle}
            component={<AboutApp />}
            bgGradient="from-gray-500 to-gray-700"
          />

          {/* Projects -> "File Explorer" */}
          <DesktopIcon
            id="projects"
            title="Projects"
            icon={FolderOpen}
            component={<ProjectsApp />}
            bgGradient="from-yellow-400 to-yellow-600"
          />

          {/* Skills -> "Terminal" */}
          <DesktopIcon
            id="skills"
            title="Skills"
            icon={Terminal}
            component={<SkillsApp />}
            bgGradient="from-gray-800 to-black"
          />

          {/* Contact -> "Outlook/Mail" */}
          <DesktopIcon
            id="contact"
            title="Contact"
            icon={Mail}
            component={<ContactApp />}
            bgGradient="from-blue-500 to-blue-600"
          />

          {/* Volunteering -> "Community" */}
          <DesktopIcon
            id="volunteering"
            title="Volunteering"
            icon={HandHeart}
            component={<VolunteeringApp />}
            bgGradient="from-indigo-500 to-violet-600"
          />

          {/* GitHub -> External Link */}
          <a
            href="https://github.com/akkified"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors group w-24 text-center cursor-pointer focus:outline-none focus:bg-white/20"
          >
            <div className="w-14 h-14 bg-[#181717] border border-white/10 rounded-xl shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Github size={28} className="text-white" />
            </div>
            <span className="text-sm font-medium text-white shadow-black drop-shadow-md select-none line-clamp-2 leading-tight">
              GitHub
            </span>
          </a>

        </Desktop>
      </main>
    </WindowProvider>
  );
}