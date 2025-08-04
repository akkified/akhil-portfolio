"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Github, ExternalLink } from "lucide-react"

interface Project {
  title: string
  description: string
  tech: string[]
  github: string
  demo: string
  image: string
}

interface FolderIconProps {
  title: string
  projects: Project[]
  color: string
}

export default function FolderIcon({ title, projects, color }: FolderIconProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full">
      {/* Folder Icon */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer group transition-all duration-300 hover:scale-105"
      >
        <div className="relative">
          {/* Folder Back */}
          <div
            className={`w-32 h-24 ${color} rounded-t-lg rounded-br-lg relative shadow-lg group-hover:shadow-xl transition-all duration-300`}
          >
            {/* Folder Tab */}
            <div className={`absolute -top-2 left-4 w-16 h-6 ${color} rounded-t-lg border-2 border-gray-700`} />

            {/* Folder Front */}
            <div
              className={`absolute top-2 left-2 right-2 bottom-2 bg-gradient-to-br ${color.replace("bg-", "from-")} to-gray-800 rounded-lg flex items-center justify-center`}
            >
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  {isOpen ? (
                    <ChevronDown size={20} className="text-white" />
                  ) : (
                    <ChevronRight size={20} className="text-white" />
                  )}
                </div>
                <h3 className="text-white font-semibold text-sm">{title}</h3>
                <p className="text-gray-300 text-xs mt-1">{projects.length} projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Projects */}
      {isOpen && (
        <div className="mt-6 space-y-4 animate-in slide-in-from-top-2 duration-300">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full md:w-32 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>
                  <p className="text-gray-300 mb-3 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </a>
                    <a
                      href={project.demo}
                      className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      <ExternalLink size={16} />
                      <span>Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
