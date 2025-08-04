"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface FolderProps {
  name: string
  children?: React.ReactNode
  className?: string
  onClick?: () => void
}

export function Folder({ name, children, className = "", onClick }: FolderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
    onClick?.()
  }

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="cursor-pointer select-none"
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Folder Icon */}
        <div className="relative w-20 h-16">
          {/* Folder Tab */}
          <div className="absolute top-0 left-2 w-8 h-3 bg-yellow-500 rounded-t-sm" />

          {/* Folder Body */}
          <div
            className={`absolute top-2 left-0 w-20 h-14 rounded-sm transition-colors duration-200 ${
              isOpen ? "bg-yellow-400" : "bg-yellow-500"
            }`}
          >
            {/* Folder Front Face */}
            <div
              className={`absolute inset-0 rounded-sm transition-colors duration-200 ${
                isOpen ? "bg-yellow-300" : "bg-yellow-400"
              }`}
            />

            {/* Folder Shadow/Depth */}
            <div className="absolute -bottom-1 -right-1 w-20 h-14 bg-yellow-600 rounded-sm -z-10" />
          </div>
        </div>

        {/* Folder Name */}
        <div className="mt-2 text-center">
          <span className="text-sm font-medium text-gray-200">{name}</span>
        </div>
      </motion.div>

      {/* Folder Contents */}
      <AnimatePresence>
        {isOpen && children && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-4 z-10 min-w-max"
          >
            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// File component for inside folders
interface FileProps {
  name: string
  type?: "js" | "ts" | "jsx" | "tsx" | "css" | "html" | "json" | "md" | "py" | "java"
  onClick?: () => void
}

export function File({ name, type = "js", onClick }: FileProps) {
  const getFileColor = (fileType: string) => {
    const colors = {
      js: "bg-yellow-500",
      ts: "bg-blue-500",
      jsx: "bg-cyan-500",
      tsx: "bg-blue-400",
      css: "bg-pink-500",
      html: "bg-orange-500",
      json: "bg-green-500",
      md: "bg-gray-500",
      py: "bg-green-600",
      java: "bg-red-500",
    }
    return colors[fileType as keyof typeof colors] || "bg-gray-500"
  }

  return (
    <motion.div
      className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700 cursor-pointer transition-colors"
      onClick={onClick}
      whileHover={{ x: 4 }}
    >
      <div className={`w-4 h-5 ${getFileColor(type)} rounded-sm flex items-center justify-center`}>
        <span className="text-white text-xs font-bold">{type.toUpperCase()}</span>
      </div>
      <span className="text-gray-200 text-sm">{name}</span>
    </motion.div>
  )
}
