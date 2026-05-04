
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";


const AboutMe = () => {
    return (
        <section className=" text-white py-5 px-2 lg:px-0 mt-10">
            <div className="bg-zinc-900 max-w-7xl mx-auto py-10 rounded-2xl">
                <div className="max-w-6xl mx-auto px-4 lg:px-2">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-[#00FFCA]"></span>
                        <span className="text-zinc-400 text-sm font-medium uppercase tracking-widest">About Me</span>
                    </div>

                    <p className="reveal-text text-5xl font-bold mb-10">
                        Developer Driven by Impact and Precision
                    </p>


                    <p className="reveal-text text-zinc-300 leading-relaxed">
                        I’m a full-stack developer focused on building fast, maintainable web applications with React, Node.js, and modern tooling. I care deeply about clean architecture, performance, and real-world usability.
                    </p>
                    <div className="md:flex justify-between space-y-4 lg:space-y-0 items-center mt-4">
                        <div>
                            <p className="text-lg font-semibold text-white mb-1">Anisha Parmar</p>
                            <p className="text-[#00FFCA] ">Fullstack Developer</p>
                        </div>
                        <Link to="/achievements" className="text-sm bg-zinc-800 hover:bg-white/20 backdrop-blur-md font-semibold text-white px-6 cursor-pointer py-2  rounded-lg transition-all  ">
                            More About Experience
                        </Link>
                    </div>



                    <hr className="border-zinc-800 my-4" />


                    <div className="flex flex-col gap-6">
                        {[
                            "Build performance-focused web applications",
                            "Turn complex ideas into clean, maintainable solutions"
                        ]
                            .map((text, idx) => (
                                <div key={idx} className="reveal-text flex items-start gap-4">
                                    <div className="mt-1 w-6 h-6 rounded-full border-2 text-[#00FFCA] flex items-center justify-center flex-shrink-0">
                                        <FaCheckCircle />
                                    </div>
                                    <p className="text-zinc-300 text-lg leading-snug">{text}</p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;