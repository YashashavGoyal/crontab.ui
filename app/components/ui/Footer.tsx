import { Clock } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-white/5 bg-slate-950/50 backdrop-blur-xl mt-auto relative z-10">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center gap-2 group w-fit">
                            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-200">
                                <Clock className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                                Chronicle
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                            Chronicle visualizes cron schedules from expressions or natural language.
                            It shows upcoming runs with UTC or local timezone support.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Tools</h3>
                        <ul className="space-y-2">
                            <FooterLink href="/">Cron Scheduler</FooterLink>
                            <FooterLink href="/manage">Manage Cron Jobs</FooterLink>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Connect</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="https://github.com/YashashavGoyal/crontab.ui"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
                                >
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://twitter.com/YashashavGoyal"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
                                >
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://linkedin.com/in/yashashavgoyal"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
                                >
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm">
                        © {currentYear} Chronicle. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="text-slate-500 text-sm">
                            Created by <a href="https://github.com/YashashavGoyal" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-400 transition-colors">Yashashav Goyal</a>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link
                href={href}
                className="text-sm text-slate-400 hover:text-indigo-300 transition-colors duration-200 block"
            >
                {children}
            </Link>
        </li>
    );
}
