"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaCode, FaPaintBrush, FaServer } from "react-icons/fa";

export function TechnologiesShowcase() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true); // Ensure animations only run client-side
    }, []);

    return (
        <section className="tech-showcase py-24 relative z-10">
            <div className="container">
                <div className="tech-header text-center mb-16">
                    <span className="section-label inline-block bg-accent-teal text-white px-5 py-2 rounded-full text-sm font-semibold mb-6">
                        Our Technologies
                    </span>
                    <h2 className="text-5xl font-bold text-white">Tools that help us create miracles</h2>
                </div>

                <div className="tech-visual flex justify-center mb-20">
                    <div className="tech-circle relative w-[600px] h-[600px] rounded-full border border-white/[0.1] flex items-center justify-center">
                        <div className="tech-center absolute w-32 h-32 bg-white rounded-full flex items-center justify-center z-10 shadow-lg text-black text-4xl font-bold font-[family-name:var(--font-anton)]">
                            AEB
                        </div>

                        {isMounted && ( // Render orbits only after mount to ensure animations start
                            <>
                                <div className="tech-orbit orbit-1 absolute w-[300px] h-[300px] rounded-full border border-white/[0.1] animate-orbit-rotate-1">
                                    <div className="tech-node absolute w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                                        <Image src="/sources/techstack/React-icon.svg.webp" alt="React" width={35} height={35} className="block m-auto animate-counter-rotate-ccw-1" style={{ objectFit: 'contain' }} />
                                    </div>
                                    <div className="tech-node absolute w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                                        <Image src="/sources/techstack/JavaScript-Logo-scaled-e1750439290173.webp" alt="JavaScript" width={35} height={35} className="block m-auto animate-counter-rotate-ccw-1" style={{ objectFit: 'contain' }} />
                                    </div>
                                    <div className="tech-node absolute w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                                        <Image src="/sources/techstack/node-js-icon-1817x2048-g8tzf91e.webp" alt="Node.js" width={35} height={35} className="block m-auto animate-counter-rotate-ccw-1" style={{ objectFit: 'contain' }} />
                                    </div>
                                </div>

                                <div className="tech-orbit orbit-2 absolute w-[500px] h-[500px] rounded-full border border-white/[0.1] animate-orbit-rotate-2">
                                    <div className="tech-node absolute w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                                        <Image src="/sources/techstack/apps-figma-icon-2048x2048-ctjj5ab7.webp" alt="Figma" width={35} height={35} className="block m-auto animate-counter-rotate-cw-2" style={{ objectFit: 'contain' }} />
                                    </div>
                                    <div className="tech-node absolute w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                                        <Image src="/sources/techstack/typescript-icon-icon-2048x2048-2rhh1z66.webp" alt="TypeScript" width={35} height={35} className="block m-auto animate-counter-rotate-cw-2" style={{ objectFit: 'contain' }} />
                                    </div>
                                    <div className="tech-node absolute w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                                        <Image src="/sources/techstack/wordpress-logo-wordpress-icon-transparent-free-png.webp" alt="WordPress" width={35} height={35} className="block m-auto animate-counter-rotate-cw-2" style={{ objectFit: 'contain' }} />
                                    </div>
                                    <div className="tech-node absolute w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                                        <Image src="/sources/techstack/Photoshop-logo-scaled-e1750439327654.webp" alt="Photoshop" width={35} height={35} className="block m-auto animate-counter-rotate-cw-2" style={{ objectFit: 'contain' }} />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="tech-categories-modern grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    <div className="tech-category-card bg-transparent p-8 rounded-xl text-left border-2 border-white/[0.1] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.1] hover:border-accent-teal">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-4">
                            <FaCode className="text-accent-teal text-xl" /> Development
                        </h3>
                        <p className="text-white/[0.8] leading-relaxed text-base">React, Vue.js, Node.js, TypeScript, JavaScript, HTML5, CSS3</p>
                    </div>
                    <div className="tech-category-card bg-transparent p-8 rounded-xl text-left border-2 border-white/[0.1] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.1] hover:border-accent-teal">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-4">
                            <FaPaintBrush className="text-accent-teal text-xl" /> Design
                        </h3>
                        <p className="text-white/[0.8] leading-relaxed text-base">Figma, Adobe Photoshop, Adobe Illustrator, Sketch</p>
                    </div>
                    <div className="tech-category-card bg-transparent p-8 rounded-xl text-left border-2 border-white/[0.1] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.1] hover:border-accent-teal">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-4">
                            <FaServer className="text-accent-teal text-xl" /> Backend & CMS
                        </h3>
                        <p className="text-white/[0.8] leading-relaxed text-base">WordPress, Shopify, WooCommerce, Custom APIs</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
