"use client"

import { Github, Linkedin, Mail, Download, Code, Database, Globe, Smartphone } from "lucide-react"
import { Folder, File } from "@/components/reactbits/Folder"
import { useState } from "react"

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<any>(null)

  const webProjects = [
    {
      name: "PaperHearts Website",
      type: "tsx" as const,
      description:
        "Full-stack web application built with Next.js, TypeScript, and Tailwind CSS. Features user authentication, donations, and a blog.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Givebutter", "Formspree"],
      github: "https://github.com/akkified/paperhearts",
      demo: "https://paperhearts-azure.vercel.app/",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Dakae LLC Website",
      type: "tsx" as const,
      description:
        "React-based product that is only accessible after logging in and paying, features include a chatbot and a guide.",
      tech: ["React", "Node.js", "MongoDB", "Socket.io"],
      github: "https://github.com/dakaeshop/hustle-guide-dakae",
      demo: "https://hustle-guide-dakae.vercel.app/",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Portfolio Website",
      type: "tsx" as const,
      description:
        "Student portfolio website built with Next.js, TypeScript, and Tailwind CSS.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/akkified/akhil-portfolio",
      demo: "https://akhilakella.vercel.app/",
      image: "/placeholder.svg?height=200&width=300",
    }
  ]

  const mobileProjects = [
    {
      name: "StudentSparks",
      type: "java" as const,
      description:
        "React Native mobile app for task management with real-time synchronization, offline support, and collaborative features.",
      tech: ["React Native", "Firebase", "Redux", "Node.js"],
      github: "#",
      demo: "#",
      image: "/placeholder.svg?height=200&width=300",
    }
  ]

  const dataProjects = [
    {
      name: "LLM Fine-Tuning on Unsloth",
      type: "py" as const,
      description:
        "Learning how to fine tune large language models on open source platform Unsloth",
      tech: ["Unsloth","Python"],
      github: "#",
      demo: "#",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "ML Stroke Prediction Model",
      type: "py" as const,
      description:
        "Machine learning model for predicting stroke types based on MRI scans of the brain.",
      tech: ["Python", "TensorFlow", "Keras", "Pandas"],
      github: "https://github.com/akkified/stroke-classification",
      demo: "https://huggingface.co/spaces/bakhili/stroke-classification",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const etcProjects = [
    {
      name: "Task Management App",
      type: "tsx" as const,
      description:
        "React Native mobile app for task management with real-time synchronization, offline support, and collaborative features.",
      tech: ["React Native", "Firebase", "Redux", "Node.js"],
      github: "#",
      demo: "#",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Fitness Tracker",
      type: "ts" as const,
      description:
        "Cross-platform mobile app for tracking workouts, nutrition, and health metrics with social features.",
      tech: ["Flutter", "Dart", "Firebase", "SQLite"],
      github: "#",
      demo: "#",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const skills = [
    { category: "Frontend", icon: Globe, items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { category: "Backend", icon: Code, items: ["Python", "Java"] },
    { category: "Mobile", icon: Smartphone, items: ["Flutter", "iOS", "Android"] },
    { category: "AI/ML", icon: Database, items: ["TensorFlow", "Keras"] }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <img
              src="pfp.png"
              alt="Akhil Akella"
              className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-purple-500 shadow-lg"
            />
            <h1 className="text-4xl sm:text-6xl font-bold mb-4">
              Hi, <span className="gradient-text">I'm Akhil</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-6">Computer Science Student & Full-Stack Developer</p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              Passionate about creating innovative solutions and learning cutting-edge technologies. 
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2">
              <Download size={20} />
              <span>Download Resume</span>
            </button>
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-200"
            >
              Get In Touch
            </button>
          </div>

          <div className="flex justify-center space-x-6">
            <a href="https://github.com/akkified" className="text-gray-400 hover:text-white transition-colors duration-200" target="_blank">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/akhil-akella-149215331/" className="text-gray-400 hover:text-white transition-colors duration-200" target="_blank">
              <Linkedin size={24} />
            </a>
            <a href="mailto:akki.akella@gmail.com" className="text-gray-400 hover:text-white transition-colors duration-200">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-300 mb-6">
                I'm a sophomore at the Alliance Academy of Innovation with a passion for full-stack development and
                emerging technologies. I love solving complex problems and turning ideas into reality through code.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                When I'm not coding, you can find me exploring the latest trends in web development and AI.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-2xl font-bold text-purple-400">5+</h3>
                  <p className="text-gray-300">Projects Completed</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-2xl font-bold text-purple-400">4.375</h3>
                  <p className="text-gray-300">GPA</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="Coding workspace"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section with ReactBits Folders */}
      <section id="projects" className="section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">My Projects</h2>

          <div className="flex justify-center items-start space-x-16 mb-12">
            {/* Web Apps Folder */}
            <Folder name="Web Apps" className="relative">
              <div className="space-y-1 min-w-[200px]">
                {webProjects.map((project, index) => (
                  <File
                    key={index}
                    name={project.name}
                    type={project.type}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </div>
            </Folder>

            {/* Mobile Apps Folder */}
            <Folder name="Mobile Apps" className="relative">
              <div className="space-y-1 min-w-[200px]">
                {mobileProjects.map((project, index) => (
                  <File
                    key={index}
                    name={project.name}
                    type={project.type}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </div>
            </Folder>

            {/* Data & ML Folder */}
            <Folder name="Data & ML" className="relative">
              <div className="space-y-1 min-w-[200px]">
                {dataProjects.map((project, index) => (
                  <File
                    key={index}
                    name={project.name}
                    type={project.type}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </div>
            </Folder>

            {/* ETC Folder */}
            <Folder name="Misc." className="relative">
              <div className="space-y-1 min-w-[200px]">
                {etcProjects.map((project, index) => (
                  <File
                    key={index}
                    name={project.name}
                    type={project.type}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </div>
            </Folder>
          </div>

          {/* Selected Project Display */}
          {selectedProject && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-800 rounded-lg p-8 shadow-xl border border-gray-700">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">{selectedProject.name}</h3>
                    <p className="text-gray-300 mb-6">{selectedProject.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProject.tech.map((tech: string, index: number) => (
                        <span key={index} className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <a
                        href={selectedProject.github}
                        className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                      >
                        <Github size={18} />
                        <span>View Code</span>
                      </a>
                      <a
                        href={selectedProject.demo}
                        className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                      >
                        <Globe size={18} />
                        <span>Live Demo</span>
                      </a>
                    </div>
                  </div>
                  <div>
                    <img
                      src={selectedProject.image || "/placeholder.svg"}
                      alt={selectedProject.name}
                      className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Skills & Technologies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillGroup, index) => {
              const IconComponent = skillGroup.icon
              return (
                <div key={index} className="bg-gray-800 p-6 rounded-lg text-center card-hover">
                  <IconComponent size={48} className="mx-auto mb-4 text-purple-400" />
                  <h3 className="text-xl font-bold mb-4">{skillGroup.category}</h3>
                  <ul className="space-y-2">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <li key={skillIndex} className="text-gray-300">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">Get In Touch</h2>
          <p className="text-lg text-gray-300 mb-8">
            I'm always open to discussing new opportunities, collaborations, or just having a chat about technology!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:akki.akella@gmail.com"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
            >
              <Mail size={20} />
              <span>Send Email</span>
            </a>
            <div className="flex space-x-6">
              <a href="https://github.com/akkified" className="text-gray-400 hover:text-white transition-colors duration-200" target="_blank">
                <Github size={32} />
              </a>
              <a href="https://www.linkedin.com/in/akhil-akella-149215331/" className="text-gray-400 hover:text-white transition-colors duration-200" target="_blank">
                <Linkedin size={32} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Skills Bar */}
      <section className="py-12 bg-gray-900 overflow-hidden">
        <div className="relative">
          <div className="flex animate-scroll space-x-8 whitespace-nowrap">
            {/* First set of skills */}
            <div className="flex space-x-8 items-center">
              <div className="flex items-center space-x-3 bg-gray-800 px-6 py-3 rounded-full">
                <Code size={20} className="text-blue-400" />
                <span className="text-white font-medium">JavaScript</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-800 px-6 py-3 rounded-full">
                <Code size={20} className="text-blue-500" />
                <span className="text-white font-medium">TypeScript</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-800 px-6 py-3 rounded-full">
                <Globe size={20} className="text-cyan-400" />
                <span className="text-white font-medium">React</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-800 px-6 py-3 rounded-full">
                <Globe size={20} className="text-gray-400" />
                <span className="text-white font-medium">Next.js</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-800 px-6 py-3 rounded-full">
                <Code size={20} className="text-green-400" />
                <span className="text-white font-medium">Node.js</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-800 px-6 py-3 rounded-full">
                <Database size={20} className="text-blue-600" />
                <span className="text-white font-medium">PostgreSQL</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-800 px-6 py-3 rounded-full">
                <Code size={20} className="text-yellow-400" />
                <span className="text-white font-medium">Python</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-800 px-6 py-3 rounded-full">
                <Globe size={20} className="text-cyan-300" />
                <span className="text-white font-medium">Tailwind CSS</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-800 px-6 py-3 rounded-full">
                <Database size={20} className="text-green-500" />
                <span className="text-white font-medium">MongoDB</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-800 px-6 py-3 rounded-full">
                <Code size={20} className="text-orange-500" />
                <span className="text-white font-medium">Java</span>
              </div>
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="flex space-x-8 items-center">
              <div className="flex items-center space-x-3 bg-gray-800 px-6 py-3 rounded-full">
                <Code size={20} className="text-blue-400" />
                <span className="text-white font-medium">JavaScript</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-800 px-6 py-3 rounded-full">
                <Code size={20} className="text-blue-500" />
                <span className="text-white font-medium">TypeScript</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-800 px-6 py-3 rounded-full">
                <Globe size={20} className="text-cyan-400" />
                <span className="text-white font-medium">React</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-800 px-6 py-3 rounded-full">
                <Globe size={20} className="text-gray-400" />
                <span className="text-white font-medium">Next.js</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-800 px-6 py-3 rounded-full">
                <Code size={20} className="text-green-400" />
                <span className="text-white font-medium">Node.js</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-800 px-6 py-3 rounded-full">
                <Database size={20} className="text-blue-600" />
                <span className="text-white font-medium">PostgreSQL</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-800 px-6 py-3 rounded-full">
                <Code size={20} className="text-yellow-400" />
                <span className="text-white font-medium">Python</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-800 px-6 py-3 rounded-full">
                <Globe size={20} className="text-cyan-300" />
                <span className="text-white font-medium">Tailwind CSS</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-800 px-6 py-3 rounded-full">
                <Database size={20} className="text-green-500" />
                <span className="text-white font-medium">MongoDB</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-800 px-6 py-3 rounded-full">
                <Code size={20} className="text-orange-500" />
                <span className="text-white font-medium">Java</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 Akhil Akella. Built with Next.js and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  )
}
