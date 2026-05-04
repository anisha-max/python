import React from 'react';
import { FiLayers, FiMonitor, FiZap } from 'react-icons/fi';

const ServicesSection = () => {
const services = [
  {
    title: "Frontend Development",
    description: "Building responsive, high-performance user interfaces using React, Next.js, Tailwind CSS, and Bootstrap.",
    icon: <FiMonitor className="w-6 h-6 text-emerald-400" />,
  },
  {
    title: "Full-Stack Development",
    description: "Developing end-to-end web applications using MERN and Next.js, including APIs, authentication, and real-time features.",
    icon: <FiLayers className="w-6 h-6 text-emerald-400" />,
    active: true
  },
  {
  title: "Performance & Optimization",
  description:
    "Improving application performance by reducing load times, optimizing assets, and writing efficient, maintainable code.",
  icon: <FiZap className="w-6 h-6 text-emerald-400" />,
}
];


    return (
        <section className=" py-8 lg:pt-16 overflow-hidden">
            <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-4">
                    <div className="space-y-4">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className={`p-6 rounded-2xl transition-all duration-300 md:flex gap-6 ${service.active
                                    ? 'bg-zinc-900/80 border border-zinc-800 shadow-2xl'
                                    : 'bg-transparent border border-transparent'
                                    }`}
                            >
                                <div className="shrink-0 w-12 h-12 rounded-lg  border border-zinc-800 flex items-center justify-center">
                                    {service.icon}
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-white font-semibold text-xl">{service.title}</h3>
                                    <p className="text-gray-300 leading-relaxed text-sm">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-4">
                    <p className="text-5xl font-bold">
                        <span className="block text-transparent "
                            style={{
                                WebkitTextStroke: '2px #00f2ad',
                                color: 'transparent'
                            }}>
                            Core Services
                            Offered
                        </span>
                    </p>
                    <div className="rounded-3xl overflow-hidden mt-16">
                        <img
                            src="/home3.jpg"
                            alt="Team collaboration"
                            className="w-full h-110 object-cover"
                        />
                    </div>
                </div>

                <div className="hidden lg:block lg:col-span-4">
                    <div className="rounded-3xl overflow-hidden ">
                        <img
                            src="/home4.jpg"
                            alt="Team meeting"
                            className="w-full h-110 object-cover"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ServicesSection;