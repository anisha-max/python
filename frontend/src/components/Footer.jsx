import React, { useRef } from 'react';
import { FaGithub, FaTwitter, FaLinkedinIn, FaMagic } from 'react-icons/fa';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className=" text-white pb-6 px-5 pt-16 md:px-10">
            {/* <div className="flex flex-col md:flex-row items-baseline justify-end gap-4 select-none">
                <p 
                    className="text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter"
                    style={{
                        WebkitTextStroke: '2px #00f2ad',
                        color: 'transparent'
                    }}
                >
                    Web
                </p>
                <p className="text-6xl md:text-[6rem] lg:text-[8rem] font-black tracking-tighter text-white">
                    Developer
                </p>
            </div> */}

          <div className='mx-auto w-fit'>
              <div className="flex gap-8 my-5 text-center">
                <a href="https://github.com/anisha-max" className="hover:text-[#00f2ad] transition-colors text-2xl"><FaGithub /></a>
                <a href="https://x.com/anisha_par23007" className="hover:text-[#00f2ad] transition-colors text-2xl"><FaTwitter /></a>
                <a href="https://www.linkedin.com/in/anisha-parmar-997160309/" className="hover:text-[#00f2ad] transition-colors text-2xl"><FaLinkedinIn /></a>
            </div>
          </div>

            <div className="border-t border-gray-800 pt-6 text-center gap-4">
                <p className="text-gray-500 text-sm">
                     © 2026 By Anisha Parmar. All rights reserved.
                </p>

            </div>
        </footer>
    );
};

export default Footer;