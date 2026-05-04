import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "../components/Card";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {

  const cards = [
    {
      image: "/services/frontend.jpg",
      title: "Frontend Development",
      description: "Build responsive, modern, and user-friendly interfaces.",
      buttonText: "View Frontend Work"
    },
    {
      image: "/services/backend.jpg",
      title: "Backend Development",
      description: "Develop server-side logic, APIs, and database systems.",
      buttonText: "View Backend Work"
    },
    {
      image: "/services/full-stack.jpg",
      title: "Full Web App Development",
      description: "Deliver complete web applications from concept to deployment.",
      buttonText: "See Full Projects"
    },
    // {
    //   image: "/services/security.jpg",
    //   title: "Authentication & Security",
    //   description: "Implement secure login and data protection measures.",
    //   buttonText: "Secure Your App"
    // },
    // {
    //   image: "/services/maintainance.jpg",
    //   title: "Maintenance & Support",
    //   description: "Provide ongoing updates and technical support.",
    //   buttonText: "Get Support"
    // },
    // {
    //   image: "/services/api.jpg",
    //   title: "API Integration Services",
    //   description: "Connect your apps with third-party APIs like payments.",
    //   buttonText: "Integrate APIs"
    // },
    // {
    //   image: "/services/refactoring.jpg",
    //   title: "Migration & Refactoring",
    //   description: "Upgrade or refactor legacy code for performance.",
    //   buttonText: "Refactor Code"
    // },
    // {
    //   image: "/services/mvp.jpg",
    //   title: "MVP in 30 Days",
    //   description: "Build a minimum viable product to validate your idea fast.",
    //   buttonText: "Build MVP"
    // },
    // {
    //   image: "/services/frontend-revamp.jpg",
    //   title: "Frontend Revamp Only",
    //   description: "Redesign or improve the UI/UX of your existing application.",
    //   buttonText: "Revamp UI"
    // },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <section className="text-white pt-20 lg:pt-26">
        <div className="flex justify-between">
          <div className="">
            <div className="flex items-center gap-2 text-lg text-white font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Services offered
            </div>
               <h1 className="text-5xl font-bold leading-tight max-w-4xl">
              Your Vision, Delivered as High-Performance Web Solutions
            </h1>
          </div>

            <Link 
              to="/contact" 
              className="border border-[#00f2ad] hover:bg-[#00f2ad] font-semibold py-3 px-8 hover:text-black text-white rounded-md transition-all text-center h-fit"
            >
              View Projects
            </Link>
        </div>
      </section>

  <section className=" grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">

          {cards.map((c, i) => (
            <div
              key={i}
              className=""
            >
              <Card
                image={c.image}
                heading={c.title}
                description={c.description}
              />
            </div>
          ))}

      </section>

    </div>
  );
}