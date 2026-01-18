"use client";

import React, { useState } from "react";
import { Search, Edit, Phone, Video, Info, ArrowUpCircle, Mail, MapPin, Github, Linkedin, MessageSquare } from "lucide-react";

interface Message {
    id: number;
    text: string;
    sender: "me" | "them";
    type?: "text" | "link";
    linkUrl?: string;
}

interface Contact {
    id: string;
    name: string;
    icon: React.ElementType;
    preview: string;
    time: string;
    messages: Message[];
}

const contacts: Contact[] = [
    {
        id: "email",
        name: "Email",
        icon: Mail,
        preview: "akki.akella@gmail.com",
        time: "Now",
        messages: [
            { id: 1, text: "Hey! Thanks for reaching out.", sender: "them" },
            { id: 2, text: "You can shoot me an email anytime at:", sender: "them" },
            { id: 3, text: "akki.akella@gmail.com", sender: "them", type: "link", linkUrl: "mailto:akki.akella@gmail.com" }
        ]
    },
    {
        id: "phone",
        name: "Phone",
        icon: Phone,
        preview: "+1 (470) 774-1985",
        time: "10:42 AM",
        messages: [
            { id: 1, text: "Prefer a call or text?", sender: "them" },
            { id: 2, text: "My number is +1 (470) 774-1985", sender: "them", type: "link", linkUrl: "tel:+14707741985" },
            { id: 3, text: "Feel free to leave a voicemail if I don't pick up!", sender: "them" }
        ]
    },
    {
        id: "linkedin",
        name: "LinkedIn",
        icon: Linkedin,
        preview: "linkedin.com/in/akhil-akella",
        time: "Yesterday",
        messages: [
            { id: 1, text: "Let's connect professionally.", sender: "them" },
            { id: 2, text: "Check out my profile on LinkedIn.", sender: "them" },
            { id: 3, text: "linkedin.com/in/akhil-akella", sender: "them", type: "link", linkUrl: "https://linkedin.com/in/akhil-akella" }
        ]
    },
    {
        id: "location",
        name: "Location",
        icon: MapPin,
        preview: "Georgia, USA",
        time: "Tuesday",
        messages: [
            { id: 1, text: "Currently based in:", sender: "them" },
            { id: 2, text: "Georgia, USA", sender: "them" }
        ]
    }
];

export default function ContactApp() {
    const [selectedId, setSelectedId] = useState<string>("email");
    const [inputText, setInputText] = useState("");

    const activeContact = contacts.find(c => c.id === selectedId) || contacts[0];

    return (
        <div className="flex h-full bg-[#1e1e1e] text-white font-sans overflow-hidden">
            {/* Sidebar / List View */}
            <div className={`w-full md:w-[320px] border-r border-[#3a3a3a] flex flex-col bg-[#2a2a2a]/50 backdrop-blur-xl ${selectedId ? 'hidden md:flex' : 'flex'}`}>
                {/* Sidebar Header */}
                <div className="h-14 flex items-center justify-between px-4 border-b border-[#3a3a3a]/50 shrink-0">

                    <Edit size={18} className="text-blue-500" />
                </div>

                {/* Search */}
                <div className="p-3 shrink-0">
                    <div className="bg-[#3a3a3a] rounded-lg flex items-center px-2 py-1.5 gap-2">
                        <Search size={14} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500"
                        />
                    </div>
                </div>

                {/* Contact List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {contacts.map((contact) => (
                        <div
                            key={contact.id}
                            onClick={() => setSelectedId(contact.id)}
                            className={`px-4 py-3 flex items-start gap-3 cursor-pointer select-none transition-colors
                                ${selectedId === contact.id ? 'bg-[#007aff] text-white' : 'hover:bg-[#3a3a3a] text-gray-200'}
                            `}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${selectedId === contact.id ? 'bg-white/20' : 'bg-[#3a3a3a]'}`}>
                                <contact.icon size={20} className={selectedId === contact.id ? 'text-white' : 'text-gray-400'} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-semibold text-sm truncate">{contact.name}</h3>
                                    <span className={`text-xs ${selectedId === contact.id ? 'text-blue-100' : 'text-gray-500'}`}>{contact.time}</span>
                                </div>
                                <p className={`text-xs truncate mt-0.5 ${selectedId === contact.id ? 'text-blue-100' : 'text-gray-500'}`}>
                                    {contact.messages[contact.messages.length - 1].text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`flex-1 flex flex-col bg-[#1e1e1e] ${!selectedId ? 'hidden md:flex' : 'flex'}`}>
                {/* Chat Header */}
                <div className="h-14 border-b border-[#3a3a3a] flex items-center justify-between px-6 shrink-0 bg-[#2a2a2a]/30 backdrop-blur-md">
                    <div className="flex flex-col items-center mx-auto md:ml-0 md:items-start md:flex-row md:gap-3">
                        <span className="text-sm font-semibold text-gray-200">
                            To: <span className="text-blue-500 font-bold ml-1">{activeContact.name}</span>
                        </span>
                    </div>
                    <div className="flex gap-4 text-blue-500">
                        <Video size={20} />
                        <Info size={20} />
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col">
                    <div className="flex-1"></div> {/* Push messages to bottom */}

                    <div className="text-center text-xs text-gray-500 my-4 font-medium">iMessage</div>

                    {activeContact.messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex w-full ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm leading-relaxed
                                ${msg.sender === 'me'
                                    ? 'bg-[#007aff] text-white rounded-br-sm'
                                    : 'bg-[#3a3a3a] text-gray-200 rounded-bl-sm'
                                }
                            `}>
                                {msg.type === 'link' ? (
                                    <a href={msg.linkUrl} className="underline hover:text-white/80" target="_blank" rel="noopener noreferrer">
                                        {msg.text}
                                    </a>
                                ) : (
                                    msg.text
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 shrink-0 bg-[#1e1e1e]">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#3a3a3a] rounded-full p-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
                            <ArrowUpCircle size={24} />
                        </div>
                        <div className="flex-1 bg-[#2a2a2a] border border-[#3a3a3a] rounded-full px-4 py-2 flex items-center gap-2">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="iMessage"
                                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-gray-500"
                            />
                            {inputText && (
                                <button className="bg-[#007aff] rounded-full p-1 text-white">
                                    <ArrowUpCircle size={16} fill="currentColor" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
