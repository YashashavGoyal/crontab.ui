"use client";

import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] pt-12 md:pt-10 text-center space-y-8 px-4 relative z-10">

            <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
                <div className="relative p-6 bg-slate-900/50 border border-slate-800 rounded-3xl backdrop-blur-sm shadow-2xl">
                    <AlertCircle className="w-16 h-16 text-indigo-400" />
                </div>
            </div>

            <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 tracking-tighter">
                    404
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Page not found
                </h2>
                <p className="text-lg text-slate-400 max-w-md mx-auto leading-relaxed">
                    {`Sorry, we couldn't find the page you're looking for. It might have been removed or renamed.`}
                </p>
            </div>

            <Link
                href="/"
                className="group flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/25 transition-all active:scale-95 hover:pl-5 hover:pr-7"
            >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to Home
            </Link>
        </div>
    );
}
