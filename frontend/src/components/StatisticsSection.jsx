import React, { useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from 'react-router-dom';


gsap.registerPlugin(ScrollTrigger);

const StatisticsSection = () => {
  const containerRef = useRef(null);

const stats = [
  { label: "Years of Development Experience", value: 1, suffix: "+" },
  { label: "Production-Ready Projects Built", value: 10, suffix: "+" },
  { label: "Tech Stack Experience (MERN, Next.js, etc.)", value: 8, suffix: "+" },
  { label: "Focus on Performance & Maintainability", value: 100, suffix: "%" },
];


useGSAP(() => {
  const counters = gsap.utils.toArray(".stat-number");

  ScrollTrigger.create({
    trigger: containerRef.current,
    start: "top 70%",
    once: true, // 🔥 important
    onEnter: () => {
      counters.forEach((counter) => {
        const target = +counter.dataset.target;

        gsap.fromTo(
          counter,
          { textContent: 0 },
          {
            textContent: target,
            duration: 1.8,
            ease: "power1.out",
            snap: { textContent: 1 },
          }
        );
      });
    },
  });
}, { scope: containerRef });

  return (
    <section ref={containerRef} className=" text-white py-4 lg:py-16 px-4 lg:px-2">
      <div className="max-w-6xl mx-auto grid grid-cols-1  md:grid-cols-4 gap-8 mb-5 md:mb-16">
        {stats.map((stat, index) => (
          <div key={index} className="border-l-2 border-gray-800  pl-6 space-y-6">
            <h4 className=" font-bold leading-tight min-h-10">
              {stat.label}
            </h4>
            <div className="flex items-center gap-1">
              <span 
                className="stat-number text-8xl font-bold opacity-20" 
                style={{ WebkitTextStroke: '2px #ffffff', color:'transparent'}}
                data-target={stat.value}
              >
                0
              </span>
              <span className="text-3xl font-black text-emerald-400">
                {stat.suffix}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-6xl mx-auto flex justify-between mt-10">
        <div className="lg:col-span-3">
          <div className="flex items-center gap-2 text-lg  text-white font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Selected Projects
          </div>
        </div>
        
        {/* <div className="lg:col-span-6">
          <p className="text-5xl font-bold leading-tight lg:max-w-md mx-auto">
           Building High-Performance, Scalable Digital Experiences
          </p>
        </div> */}

      <Link to="/projects" className="border border-[#00f2ad] hover:bg-[#00f2ad] font-semibold py-3 px-8 hover:text-black text-white rounded-md transition-all ms-auto">
                  View All Projects
                </Link>
        {/* <div className="lg:col-span-3 flex flex-col justify-between">
                   <Link to="/projects" className="border border-[#00f2ad] hover:bg-[#00f2ad] font-semibold py-3 px-8 hover:text-black text-white rounded-md transition-all ms-auto">
                  View All Projects
                </Link>
          <p className="text-gray-400 pt-5">
       Each project demonstrates a thoughtful approach to problem-solving and user experience. I specialize in creating fast, scalable, and visually polished web solutions.
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default StatisticsSection;