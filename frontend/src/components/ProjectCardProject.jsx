import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProjectCardProject = ({ project, isEven }) => {
  return (
    <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 mb-16`}>
      <div className="w-full lg:w-1/2">
        <div className="relative group">
          <div className="absolute -inset-1 bg-[#00FFCA] rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-500"></div>
         <img
  src={
    project.media_files?.find(
      (file) => file.type === "image"
    )?.url
  }
  alt={project.title}
  className="relative rounded-2xl border border-white/10 w-full md:max-h-[60vh] shadow-2xl"
/>
        </div>
      </div>
      <div className="w-full lg:w-1/2 space-y-6">
        <span className="text-[#00FFCA] bg-[#00FFCA]/10 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
          {project.category ?? project.status ?? "Project"}
        </span>

        <h2 className="text-4xl font-bold text-white tracking-tight">
          {project.title}
        </h2>

        <p className="text-gray-400 text-lg leading-relaxed">
          {project.description?.slice(0, 200) ?? ""}...
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {(project.techStack ?? project.tech_stack?.split(",").map((item) => item.trim()) ?? []).map((t, i) => (
            <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-gray-300 text-sm">
              {t}
            </span>
          ))}
        </div>

        <div className='flex flex-col md:flex-row md:items-center gap-3 mt-4 '>
          <a href={project.liveLink} target="_blank" className="cursor-pointer px-8 py-3 bg-[#00FFCA] text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,255,202,0.4)] transition-all w-fit">
            View Live →
          </a>
          <Link
            to={`/projects/${project.id}`}
            className=' px-8 py-3 bg-[#00FFCA] text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,255,202,0.4)] transition-all w-fit'
          >
            Details
          </Link>
             {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="bg-[#00FFCA] p-3.5 rounded-full text-black hover:scale-110 active:scale-95 transition-all shadow-lg shadow-[#00FFCA]/20 w-fit"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub size={24} />
            </a>
          )}
        </div>


      </div>
    </div>
  );
};

export default ProjectCardProject;