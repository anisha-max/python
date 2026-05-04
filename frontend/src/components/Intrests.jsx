import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const processes = [
  {
    number: "01",
    title: "Discovery",
    description: "Understanding goals, requirements, and project scope to align strategy from the start.",
  },
  {
    number: "02",
    title: "Planning",
    description: "Defining structure, timelines, and technical approach for a smooth development phase.",
  },
  {
    number: "03",
    title: "Design & Build",
    description: "Creating user-focused designs and developing scalable, high performance solutions.",
  },
  {
    number: "04",
    title: "Testing",
    description: "Ensuring quality, performance, and compatibility across devices and browsers.",
  },
  {
    number: "05",
    title: "Launch & Support",
    description: "Deploying the project and providing ongoing support for long-term success.",
  },
];

const Intrests = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.utils.toArray(".process-step").forEach((step) => {
      gsap.from(step, {
        opacity: 0,
        x: 50,
        duration: 1,
        scrollTrigger: {
          trigger: step,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className=" text-white py-16 lg:py-24 px-4 lg:px-2">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="lg:sticky lg:top-24 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FFCA]"></span>
            <span className="text-zinc-400 text-sm font-medium uppercase tracking-widest">Work Process</span>
          </div>
          <p className="text-5xl  font-bold leading-tight">
            How Projects Are Delivered Efficiently
          </p>
          <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
            A transparent and structured workflow designed to keep projects organized, collaborative, and delivered on time.
          </p>
          <Link to="/achievements" className="mt-4 w-fit px-8 py-3 rounded-xl bg-zinc-800/80 text-white font-medium hover:bg-zinc-700 transition-all border border-zinc-700/50">
          Achievements
          </Link>
        </div>


<div className="grid lg:grid-cols-2 gap-10">
            <div className="flex flex-col gap-20 lg:pt-12">
          {processes.slice(0,3).map((item, index) => (
            <div key={index} className="process-step relative flex gap-8 group cursor-pointer">
              <span className="absolute -left-4 -top-8 text-8xl font-bold text-white/5 select-none transition-colors group-hover:text-[#00FFCA]/20">
                {item.number}
              </span>

              <div className="w-2 h-36 bg-[#00FFCA]/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[#00FFCA] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
              </div>

              <div className="flex flex-col gap-1 relative z-10">
                <h3 className="text-2xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-base leading-relaxed max-w-md">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
             <div className="flex flex-col gap-20 lg:pt-12 justify-center">
          {processes.slice(3).map((item, index) => (
            <div key={index} className="process-step relative flex gap-8 group cursor-pointer">
              <span className="absolute -left-4 -top-8 text-8xl font-bold text-white/5 select-none transition-colors group-hover:text-[#00FFCA]/10">
                {item.number}
              </span>
              <div className="w-2 h-36 bg-[#00FFCA]/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[#00FFCA] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
              </div>

              <div className="flex flex-col gap-1 relative z-10">
                <h3 className="text-2xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-base leading-relaxed max-w-md">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
</div>

      </div>
    </section>
  );
};

export default Intrests;