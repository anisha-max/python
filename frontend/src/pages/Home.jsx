import React from 'react'
import { FaFileDownload, FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import ServicesSection from '../components/ServicesSection'
import StatisticsSection from '../components/StatisticsSection'
import { Link } from 'react-router-dom'
import AboutMe from '../components/AboutMe'
import TechSlider from '../components/TechSlider'
import ProjectCardHome from '../components/ProjectCardHome'
import Skill from '../components/Skills'

function Home() {

  const projects = [
    {
      title: "Ride booking web application",
      tags: ["MERN", "Tailwind", "Google Map Api", "Socket.io"],
      imageSrc: "/uber2.png",
      link: "/projects"
    },
    {
      title: "Video Streaming Platform",
      tags: ["NextJs", "NextAuth", "Tailwind", "ImageKit"],
      imageSrc: "/videoapp.png",
      link: "/projects"
    }
  ];



  return (
    <div className="relative">
      <section
        className="relative  min-h-screen bg-fixed w-full flex items-center justify-center  bg-center bg-cover bg-no-repeat pt-20 pb-10 px-4 lg:px-2"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.9) 100%), url('/homebg.jpg')`
        }}
      >
        <div className="max-w-7xl mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 lg:gap-40 items-baseline-last">
            <div className="text-white lg:text-end max-w-md">
              <p className="text-6xl md:text-8xl lg:text-9xl font-semibold ">
                Innovate
              </p>
              <p className="text-6xl md:text-8xl lg:text-9xl font-semibold  text-transparent bg-clip-text"
                style={{
                  WebkitTextStroke: '2px #00f2ad',
                  color: 'transparent'
                }}>
                Build
              </p>
              <p className="text-6xl md:text-8xl lg:text-9xl font-semibold ">
                Deploy
              </p>

            </div>

            <div className="text-white space-y-3 max-w-md ">
              <p className="text-3xl font-semibold">
                Talk Less , <br /> Ship more.
              </p>
              <p className="text-gray-300 text-lg ">
                Building high-performance web applications with clean architecture, scalable systems, and a strong focus on real-world impact and user experience.
              </p>

              <div className="flex flex-wrap gap-4 py-4">
                <a href="/Anisha_Parmar_Fullstack_Developer.pdf" download="Anisha_Parmar_Fullstack_Developer" className="bg-zinc-800 hover:bg-white/20 backdrop-blur-md font-semibold text-white px-8 py-3 rounded-md transition-all border border-white/10 inline-flex gap-2 items-center">
                  Download Resume <FaFileDownload className='animate-bounce' />
                </a>
                <Link to="/projects" className="border border-[#00f2ad] hover:bg-[#00f2ad] font-semibold hover:text-black text-white px-8 py-3 rounded-md transition-all">
                  View Projects
                </Link>
              </div>
            </div>
          </div>
          <div className="pt-10 flex items-center gap-2 text-sm text-gray-300 justify-center">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <p className='text-white font-semibold'>Anisha Parmar — Software Developer</p>
          </div>
          <div className='md:flex justify-between text-gray-300 pt-10'>
            <div className='border-l-2 px-5 border-[#00f2ad] max-w-md pb-5 md:pb-0'>
              Frontend Expert | Full-Stack Enthusiast.
            </div>
            <div className='flex justify-around gap-5'>
              <div className='flex items-center gap-2'>
                <a href="https://github.com/anisha-max" target='_blank' className="text-[#00f2ad] hover:text-gray-300 transition-colors text-lg border border-gray-600 rounded-md p-1"><FaGithub /></a> Github
              </div>
              <div className='flex items-center gap-2'>
                <a href="https://www.linkedin.com/in/anisha-parmar-997160309/" target='_blank' className="text-[#00f2ad] hover:text-gray-300 transition-colors text-lg border border-gray-600 rounded-md p-1"><FaLinkedinIn /></a> Linkedin
              </div>
              <div className='flex items-center gap-2'>
                <a href="https://x.com/anisha_par23007" target='_blank' className="text-[#00f2ad] hover:text-gray-300 transition-colors text-lg border border-gray-600 rounded-md p-1"><FaTwitter /></a> Twitter

              </div>
            </div>

          </div>
        </div>
      </section>


      <Skill/>


      
      <StatisticsSection />
      <section className='max-w-6xl mx-auto px-4 lg:px-2'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((p, i) => <ProjectCardHome key={i} {...p} />)}
        </div>
        <p className='text-white font-medium py-16 text-center'>
          Have a project in mind? <Link to="/contact" className='brand-color'>
            Let’s work together
          </Link>
        </p>
      </section>

      <TechSlider />
    </div>
  )
}

export default Home
