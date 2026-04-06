'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Image as ImageIcon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full h-24 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
            <div className="max-w-7xl mx-auto h-full px-[5%] flex justify-between items-center">
                <div className="flex items-center gap-3 group cursor-pointer transition-transform hover:scale-105">
                    <div className="bg-purple-600/20 p-2 rounded-xl group-hover:bg-purple-600/30 transition-colors">
                        <ImageIcon size={32} className="text-purple-500" />
                    </div>
                    <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        Remov<span className="text-indigo-600">AI</span>
                    </span>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-10 font-bold text-sm uppercase tracking-widest text-gray-500">
                    <Link href="/" className="text-gray-900 hover:text-indigo-600 transition-colors">Home</Link>
                    <Link href="/pricing" className="hover:text-gray-900 transition-colors">Pricing</Link>
                    <Link href="/about" className="hover:text-gray-900 transition-colors">About</Link>
                    <Link href="/gallery" className="hover:text-gray-900 transition-colors">Gallery</Link>
                </div>

                <div className="hidden md:flex gap-4">
                    <button className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">
                        Log In
                    </button>
                    <button className="px-8 py-3 text-sm font-bold bg-white hover:bg-gray-50 transition-all border border-gray-200 hover:border-gray-300 active:scale-95 rounded-xl text-gray-900 shadow-sm">
                        Try Pro
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button 
                    className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-24 left-0 w-full bg-white/95 backdrop-blur-3xl border-b border-gray-200 p-8 flex flex-col gap-6 md:hidden z-40"
                    >
                        <Link href="/" onClick={() => setIsOpen(false)} className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition-colors">Home</Link>
                        <Link href="/pricing" onClick={() => setIsOpen(false)} className="text-xl font-bold text-gray-600 hover:text-indigo-600 transition-colors">Pricing</Link>
                        <Link href="/about" onClick={() => setIsOpen(false)} className="text-xl font-bold text-gray-600 hover:text-indigo-600 transition-colors">About</Link>
                        <Link href="/gallery" onClick={() => setIsOpen(false)} className="text-xl font-bold text-gray-600 hover:text-indigo-600 transition-colors">Gallery</Link>
                        <div className="h-px bg-gray-100 my-2" />
                        <button className="py-4 text-xl font-bold text-gray-600 hover:text-gray-900 text-left">Log In</button>
                        <button className="primary-button w-full">Sign Up Free</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
