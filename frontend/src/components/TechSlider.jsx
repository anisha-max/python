import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const logos = [
  { name: "NodeJs" },
  { name: "ExpressJS" },
  { name: "MongoDB" },
  { name: "Socket.io" },
  { name: "Redux" },
  { name: "Tailwind" },
  { name: "Bootstrap" },
  { name: "React" },
  { name: "TypeScript" },
  { name: "JavaScript" },
  { name: "CSS" },
  { name: "HTML" },
];



const TechSlider = () => {
  const sliderRef = useRef(null);

  useGSAP(() => {
    const slider = sliderRef.current;
    if (!slider) return;

  
    const totalWidth = slider.scrollWidth / 2;


    gsap.to(slider, {
      x: `-=${totalWidth}`, 
      duration: 30, 
      ease: "none",
      repeat: -1, 
      onReverseComplete: () => {
        gsap.set(slider, { x: 0 });
      }
    });
  }, { scope: sliderRef });

  return (
    <div className="max-w-6xl mx-auto  py-12 overflow-hidden relative">
             <div 
        ref={sliderRef} 
        className="flex whitespace-nowrap items-center gap-16 md:gap-24"
      >
        {[...logos, ...logos].map((logo, index) => (
          <div 
            key={index} 
            className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity duration-300"
          >
            {/* <span className="text-4xl grayscale brightness-150">{logo.icon}</span> */}
            <span className="text-2xl font-bold text-zinc-300 uppercase tracking-widest">
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechSlider;