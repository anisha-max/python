import { useEffect, useState } from "react";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import ProjectCardProject from '../components/ProjectCardProject';
import { fetchProjects } from "../services/api";
import { projects as fallbackProjects } from "../data/project";

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -right-4 md:-right-10 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full border border-zinc-800 text-zinc-400 hover:border-emerald-500 hover:text-emerald-500 transition-all hidden md:block"
  >
    <HiOutlineArrowRight size={24} />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -left-4 md:-left-10 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full border border-zinc-800 text-zinc-400 hover:border-emerald-500 hover:text-emerald-500 transition-all hidden md:block"
  >
    <HiOutlineArrowLeft size={24} />
  </button>
);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    fetchProjects()
      .then((projects) => {
        if (!active) return;
        setProjects(projects || []);
        console.log(projects)
      })
      .catch((err) => {
        console.error(err);
        if (!active) return;
        setError("Unable to load projects from API.");
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  // const projectList = projects.length > 0 ? projects : fallbackProjects;

  return (
<>
    <section className="pt-20 pb-8 lg:pt-26  overflow-hidden max-w-6xl mx-auto text-white">
      <div className=" mx-auto w-full relative">
        <div className="flex flex-col items-center text-center mb-20">
          <header className="mb-5 text-center">
            <h1 className="text-5xl font-black mb-4 ">Featured <span className="text-[#00FFCA]">Work</span></h1>
            <div className="h-1 w-20 bg-[#00FFCA] mx-auto"></div>
          </header>
          <p className=" text-lg md:text-xl leading-relaxed">
            Each project carries a story of learning — moments of confusion, breakthroughs, and quiet progress. From shaping interfaces to building real-time systems, every line of code reflects growth, curiosity, and the journey of becoming a better developer.
          </p>
        </div>
        <div className="min-h-screen   md:py-5 px-6">
          {loading ? (
            <div className="text-center text-gray-400 py-20">Loading projects...</div>
          ) : (
            <section>
              {projects.map((item, index) => (
                <ProjectCardProject
                  key={item.id ?? index}
                  project={item}
                  isEven={index % 2 === 0}
                />
              ))}
            </section>
          )}
          {error && (
            <div className="mt-8 text-center text-red-400">{error}</div>
          )}
        </div>
      </div>
    </section>

    {/* <section className='max-w-7xl mx-auto pb-16'>
         <div className="relative px-2 md:px-12">
          <Slider {...settings} className="project-slider overflow-visible">
            {projects.map((project, index) => (
              <SliderProjectCard key={index} project={project} />
            ))}
          </Slider>
        </div>
    </section> */}
    </>
  );
};

export default Projects;