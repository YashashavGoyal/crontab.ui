"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-[101] border-b border-white/5 bg-slate-950/50 backdrop-blur-2xl supports-[backdrop-filter]:bg-slate-950/30">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group z-50 relative">
                        <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 overflow-hidden">
                            <Image
                                src="/logo.png"
                                alt="Chronicle Logo"
                                width={40}
                                height={40}
                                sizes="any"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white group-hover:text-indigo-200 transition-colors">Chronicle</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/manage">Manage</NavLink>
                        <NavLink href="/docs">Docs</NavLink>
                    </div>

                    <div className="flex items-center gap-4 z-50 relative">
                        <a
                            href="https://github.com/YashashavGoyal/crontab.ui"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200 border border-transparent hover:border-white/10"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                            <span className="hidden sm:inline">Star on GitHub</span>
                        </a>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
                            aria-label="Toggle menu"
                        >
                            <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
                                <span className={`block w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                                <span className={`block w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                                <span className={`block w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black/95 backdrop-blur-xl transition-all duration-300 md:hidden z-[100] flex flex-col pt-24 px-8 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div className="flex flex-col gap-6">
                    <MobileNavLink href="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
                    <MobileNavLink href="/manage" onClick={() => setIsOpen(false)}>Manage</MobileNavLink>
                    <MobileNavLink href="/docs" onClick={() => setIsOpen(false)}>Docs</MobileNavLink>
                </div>

                <div className="mt-auto mb-12 border-t border-white/10 pt-8">
                    <a
                        href="https://github.com/YashashavGoyal/crontab.ui"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10"
                        onClick={() => setIsOpen(false)}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium text-lg">Star on GitHub</span>
                    </a>
                </div>
            </div>
        </>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 relative group py-1"
        >
            {children}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
        </Link>
    );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="text-2xl font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200 py-4 px-4 rounded-xl flex items-center gap-4 border border-transparent hover:border-white/5"
        >
            <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
            {children}
        </Link>
    );
}
