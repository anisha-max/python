import React, { useState } from 'react';
import { HiOutlineChevronRight } from "react-icons/hi2";
import { 
  MdOutlineCode, 
  MdOutlineEmojiEvents, 
  MdOutlineRocketLaunch, 
  MdOutlineWorkspacePremium,
  MdOutlineTerminal, 
  MdOutlineAutoGraph
} from "react-icons/md";

const Achievements = () => {
 
  const [activeTab, setActiveTab] = useState('Experience');

  const achievements = [
    {
      id: "Experience",
      icon: <MdOutlineTerminal />, 
      title: "Experienced Frontend Developer (1+ year)",
      date: "Current",
      description: "Contributed to the development, testing, and maintenance of web applications in a collaborative team environment. Focused on writing clean, maintainable code and learning best practices.",
      image: "me.JPG",
      category: "project",
      tags: ["React.js", "Node.js", "MongoDB", "Git", "Agile", "NextJS"],
      points: [
        "Collaborative Team Development",
        "Responsive UI implementation with React",
        "Version Control and Agile Workflows",
        "Full-stack integration and debugging"
      ],
    },
    {
      id: "Awards",
      icon: <MdOutlineEmojiEvents />,
      title: "Employee Of The Month",
      date: "August 2025",
      description: "Recognized for exceptional performance and dedication. Demonstrated strong skills in frontend development using modern stacks and contributed effectively to UI enhancements.",
      image: "ANISHA.jpg",
      category: "certification",
      tags: ["Dedication", "Teamwork", "Communication"],
      points: [
        "Exceptional Performance Recognition",
        "Bug Fixing & Feature Development",
        "Proactive UI/UX Enhancements",
        "Effective Team Communication"
      ],
    },
    // {
    //   id: "Project milestones",
    //   icon: <MdOutlineRocketLaunch />,
    //   title: "Deployed Ride Booking Web Apps",
    //   date: "June 2025",
    //   description: "End-to-end development and deployment of scalable full-stack web applications on Render using Next.js and MongoDB. Implemented secure user authentication and dynamic routing.",
    //   image: "/uber.png",
    //   category: "Live projects",
    //   tags: ["Next.js", "Socket.io", "Google Map Api", "Deployment"],
    //   points: [
    //     "Real-time Data Handling",
    //     "Secure Authentication Systems",
    //     "Cloud-based Deployment (Render)",
    //     "Dynamic Route Optimization"
    //   ],
    //   link: "https://fullstack-video-application.onrender.com",
    // },
    // {
    //   id: "Learning milestones",
    //   icon: <MdOutlineAutoGraph />,
    //   title: "Successfully Deployed Video Streaming Apps",
    //   date: "Oct 2024",
    //   description: "Implemented high-performance video streaming capabilities with real-time media handling and cloud-based storage integration.",
    //   image: "/videoapp.png",
    //   category: "Live projects",
    //   tags: ["Next.js", "MongoDB", "NextAuth", "ImageKit", "Full-Stack"],
    //   points: [
    //     "Cloud-based Media Storage",
    //     "Real-time Media Processing",
    //     "Secure User Sessions (NextAuth)",
    //     "Optimized Video Playback"
    //   ],
    // },
    {
      id: "Certificate",
      icon: <MdOutlineWorkspacePremium />,
      title: "React Mastery Certification",
      date: "Oct 2024",
      description: "Completed an intensive advanced React certification covering hooks, state management, and performance testing to build high-scale applications.",
      image: "/react_certificate.png",
      category: "certification",
      tags: ["React.js", "Hooks", "State Management", "Testing"],
      points: [
        "Advanced React Hooks Mastery",
        "Complex State Management Architectures",
        "Performance Optimization & Testing",
        "Scalable Component Design"
      ],
    }
  ];

 
  const activeContent = achievements.find((s) => s.id === activeTab) || achievements[0];

  return (
    <div className=" text-white min-h-screen pt-26 pb-16 px-4 lg:px-2">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Sidebar */}
        <div className="lg:col-span-4">
          <p className="text-2xl font-semibold mb-8 tracking-tight">Achievements</p>
          <div className="flex flex-col gap-3">
            {achievements.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                  activeTab === item.id
                    ? 'border-emerald-500 bg-zinc-900 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                    : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-600 hover:bg-zinc-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xl ${activeTab === item.id ? 'text-emerald-500' : 'text-zinc-500'}`}>
                    {item.icon}
                  </span>
                  <span className={`text-[15px] font-medium ${activeTab === item.id ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                    {item.id}
                  </span>
                </div>
                <HiOutlineChevronRight className={`transition-transform duration-300 ${activeTab === item.id ? 'translate-x-1 text-emerald-500' : 'text-zinc-600'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          {/* We use the key here to restart the animation when switching tabs */}
          <div key={activeContent.id} className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            <p className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              {activeContent.title}
            </p>
            
            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed max-w-3xl">
              <p>{activeContent.description}</p>
              <div className="flex flex-wrap gap-2">
                {activeContent.tags.map((tag) => (
                    <span key={tag} className="text-xs font-mono px-2 py-1 bg-zinc-800 rounded border border-zinc-700 text-emerald-400">
                        {tag}
                    </span>
                ))}
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-xl font-bold mb-5">Key Highlights</h3>
                <ul className="space-y-4">
                  {activeContent.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-zinc-300">
                      <span className="mt-2 w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
                      <span className="text-[16px]">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image Section */}
              <div className="relative group h-64 overflow-hidden rounded-2xl border border-zinc-800">
                <img 
                  src={activeContent.image} 
                  alt={activeContent.title}
                  className="w-full h-full object-cover  group-hover:opacity-100 transition-all duration-700 ease-in-out"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Achievements;