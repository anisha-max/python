import React, { useEffect, useRef, useState } from 'react';
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { Link, NavLink } from 'react-router-dom';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const navLinks = [
        { name: 'Home', to: "/" },
        { name: 'Projects', to: "/projects" },
        { name: 'About Me', to: "/about" },
        { name: 'Resume', to: "/resume" },
        { name: 'Achievements', to: "/achievements" },

    ];
    const [isOpen, setIsOpen] = useState(false);
    const overlay = useRef(null)
    const contentRef = useRef(null);
    const tlRef = useRef(null);
    useGSAP(() => {
        tlRef.current = gsap.timeline({ paused: true });
        tlRef.current
            .to(overlay.current, {
                left: 0,
                duration: 0.4,
                ease: "power2.out"
            })
            .to(
                contentRef.current,
                {
                    x: "100%",
                    duration: 0.8,
                    ease: "expo.out"
                },
                "-=0.2"
            );
    }, []);


    useGSAP(() => {
        if (isOpen) {
            tlRef.current.play();
        } else {
            tlRef.current.reverse();
        }
    }, [isOpen]);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-[#00f2ad]/10 shadow-[0_10px_30px_-15px_rgba(0,242,173,0.3)]">
                <div className='max-w-7xl mx-auto text-white px-5 md:px-10  lg:px-0 py-3 flex items-center justify-between'>
                    <div className="flex items-center text-2xl md:text-3xl font-bold tracking-tight">
                        <span className='z-10'>Web</span>
                        <span className=' bg-[#00f2ad] -ms-1 rounded-3xl  shadow-[0_0_15px_rgba(0,242,173,0.5)] px-1 mt-3'>
                            Dev
                        </span>
                    </div>


                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) =>
                            link.name === "Resume" ? (
                                <a
                                    key={link.name}
                                    href="/Anisha_Parmar_Fullstack_Developer.pdf" download="Anisha_Parmar_Fullstack_Developer"
                                    className="text-gray-300 hover:text-white text-[15px] font-medium"
                                >
                                    Resume
                                </a>
                            ) : (
                                <NavLink
                                    key={link.name}
                                    to={link.to}
                                    className={({ isActive }) =>
                                        `text-[15px] font-medium ${isActive ? 'brand-color' : 'text-gray-300'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            )
                        )}

                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
                            <FaBars />
                        </button>
                    </div>

                    <Link to="/contact" className="group hidden md:flex items-center gap-2 border-2  border-[#00f2ad] hover:bg-[#00f2ad]  hover:border-[#1e1e1e] hover:text-black rounded-full pl-6 pr-2 py-2 transition-all duration-300">
                        <span className="text-sm font-semibold">Contact</span>
                        <IoArrowForwardCircleOutline
                            size={28}
                            className="text-[#00f2ad] group-hover:bg-[#00f2ad] group-hover:text-black rounded-full transition-all"
                        />
                    </Link>
                </div>
            </nav>
            <div
                ref={overlay}
                className='fixed top-0 -left-full w-full h-screen bg-black/60 z-60 md:hidden'
                onClick={() => setIsOpen(false)}
            >
                <div
                    ref={contentRef}
                    onClick={(e) => e.stopPropagation()}
                    className='bg-[#121212] h-screen w-[75vw] -left-[75vw] absolute border-r border-white/10 px-4'
                >
                    <div className='flex justify-between text-white font-bold py-6'>
                        <div className="flex items-center text-2xl md:text-3xl font-bold tracking-tight">
                            <span className='z-10'>Web</span>
                            <span className=' bg-[#00f2ad] -ms-1 rounded-3xl  shadow-[0_0_15px_rgba(0,242,173,0.5)] px-1 mt-3'>
                                Dev
                            </span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-gray-300">
                            <FaTimes />
                        </button>
                    </div>
                    <div className='flex flex-col gap-3'>
                        {navLinks.map((link) => (
                            <NavLink
                                onClick={() => setIsOpen(false)}
                                to={link.to}
                                key={link.name}
                                className=" text-white hover:text-[#00f2ad]"
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        <NavLink onClick={() => setIsOpen(false)}
                            to="/contact"
                            className=" text-white hover:text-[#00f2ad]"
                        >
                            Contact
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;