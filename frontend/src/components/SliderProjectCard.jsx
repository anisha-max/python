import React, { useRef } from 'react'

import { MdArrowOutward } from 'react-icons/md';
import { FaGithub } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function SliderProjectCard({ project }) {
    const container = useRef();
    const overlayRef = useRef();
    const contentRef = useRef();

    useGSAP(() => {
        gsap.set(overlayRef.current, { opacity: 0 });
        gsap.set(contentRef.current, { y: 40, opacity: 0 });

        const tl = gsap.timeline({ paused: true });
        tl.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" })
            .to(contentRef.current, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, "-=0.2");

        const el = container.current;
        const handleEnter = () => tl.play();
        const handleLeave = () => tl.reverse();

        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);

        return () => {
            el.removeEventListener("mouseenter", handleEnter);
            el.removeEventListener("mouseleave", handleLeave);
        };
    }, { scope: container });

    return (
        <div ref={container} className="px-3 outline-none">
            <div className="relative h-130 rounded-[2.5rem] overflow-hidden cursor-pointer border border-zinc-800 bg-zinc-900 shadow-xl">
                <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale-10 group-hover:grayscale-0 transition-all duration-700"
                />

                <div
                    ref={overlayRef}
                    className="absolute inset-0 bg-black/80 flex flex-col justify-end p-10 z-10"
                >
                    <div ref={contentRef}>
                        <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">{project.title}</h3>
                        <p className="text-white text-sm mb-8 leading-relaxed line-clamp-3">
                            {project.description}
                        </p>

                        <div className="md:flex items-center justify-between space-y-2 lg:space-y-0 pt-6 border-t border-white/10">
                            <div className="flex flex-wrap gap-3">
                                {project.technologies.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00FFCA]"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-3">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="bg-[#00FFCA] p-3.5 rounded-full text-black hover:scale-110 active:scale-95 transition-all shadow-lg shadow-[#00FFCA]/20"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <FaGithub size={24} />
                                    </a>
                                )}

                                {project.live && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="bg-[#00FFCA] p-3.5 rounded-full text-black hover:scale-110 active:scale-95 transition-all shadow-lg shadow-[#00FFCA]/20"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <MdArrowOutward size={24} />
                                    </a>
                                )}
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};


export default SliderProjectCard
