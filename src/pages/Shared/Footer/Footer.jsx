import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-base-200">
            <div className="w-full max-w-7xl mx-auto px-4 py-12">
                <div className="grid gap-10 md:grid-cols-4">
                    {/* Brand */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <span className="text-primary font-bold text-lg">AV</span>
                            </div>
                            <span className="text-xl font-semibold tracking-tight">AssetVerse</span>
                        </div>
                        <p className="text-sm opacity-70 leading-relaxed">
                            Corporate asset tracking & HR-friendly management in one clean platform.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-3">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a className="link link-hover">Home</a></li>
                            <li><a className="link link-hover">Join as Employee</a></li>
                            <li><a className="link link-hover">Join as HR Manager</a></li>
                            <li><a className="link link-hover">Login</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-3">Contact</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <span className="opacity-70">Email:</span>{" "}
                                <a className="link link-hover">support@assetverse.com</a>
                            </li>
                            <li>
                                <span className="opacity-70">Phone:</span>{" "}
                                <a className="link link-hover">+1 (555) 123-4567</a>
                            </li>
                            <li className="opacity-70">Hours: Sun–Thu, 9:00–6:00</li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-semibold mb-3">Social</h4>
                        <div className="flex items-center gap-3">
                            {/* X */}
                            <button className="btn btn-ghost btn-circle" aria-label="X">
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                                    <path d="M18.9 2H22l-6.8 7.8L23 22h-6.7l-5.3-6.5L5.3 22H2l7.3-8.4L1 2h6.8l4.8 5.8L18.9 2Zm-1.2 18h1.7L6.7 3.9H4.9L17.7 20Z" />
                                </svg>
                            </button>

                            {/* LinkedIn */}
                            <button className="btn btn-ghost btn-circle" aria-label="LinkedIn">
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM.5 8.5H4.5V23H.5V8.5ZM8 8.5H11.8V10.3H11.85C12.38 9.34 13.68 8.33 15.62 8.33 19.63 8.33 20.38 10.97 20.38 14.4V23H16.38V15.1C16.38 13.22 16.34 10.8 13.78 10.8 11.18 10.8 10.78 12.83 10.78 14.96V23H6.78V8.5H8Z" />
                                </svg>
                            </button>

                            {/* Facebook */}
                            <button className="btn btn-ghost btn-circle" aria-label="Facebook">
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                                    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.25c-1.23 0-1.61.76-1.61 1.54V12h2.74l-.44 2.89h-2.3v6.99A10 10 0 0 0 22 12Z" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-xs opacity-70 mt-3">
                            Use the new X logo (not the old Twitter bird).
                        </p>
                    </div>
                </div>

                <div className="divider my-8" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-sm opacity-70">
                        © {new Date().getFullYear()} AssetVerse. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                        <a className="link link-hover">Privacy Policy</a>
                        <a className="link link-hover">Terms</a>
                        <a className="link link-hover">Support</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer