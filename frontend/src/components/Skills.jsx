
import React from 'react'

function Skill() {
    const skills = [
        {
            image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
            name: 'JavaScript',
            des: 'Powerful language for building web applications.',
        },
        {
            image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
            name: 'React',
            des: 'Component-based frontend library for building UIs.',
        },
        {
            image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
            name: 'Next.js',
            des: 'React-based framework for building full-stack web applications.',
        },
        {
            image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
            name: 'MongoDB',
            des: 'NoSQL database for handling large-scale data.',
        },
        {
            image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
            name: 'Express.js',
            des: 'Minimal Node.js framework for building REST APIs.',
        },
        {
            image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
            name: 'Node.js',
            des: 'JavaScript runtime environment for backend development.',
        },
        {
            image: 'https://www.svgrepo.com/show/354431/tailwindcss-icon.svg',
            name: 'Tailwind CSS',
            des: 'Utility-first CSS framework for faster UI development.',
        },
        {
            image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
            name: 'Bootstrap',
            des: 'Responsive design framework with prebuilt components.',
        },
        {
            image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
            name: 'HTML5',
            des: 'The backbone of web content and structure.',
        },
        {
            image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
            name: 'CSS3',
            des: 'Styling language to bring web pages to life.',
        },
        {
            image: '/next.jpg',
            name: 'NextAuth.js',
            des: 'Authentication for Next.js apps with OAuth, credentials, and session management.',
        },
        {
            image: '/google.png',
            name: 'Google Maps API',
            des: 'Integrating maps, geolocation, markers, and places into web apps.',
        },
        {
            image: '/imagekit.jpg',
            name: 'ImageKit',
            des: 'Optimized image and video delivery with CDN, transformations, and uploads.',
        },
        {
            image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
            name: 'GitHub',
            des: 'Platform to manage code, collaborate, and deploy.',
        },
    ];


    return (
        <section className='max-w-6xl mx-auto px-4 lg:px-2 py-16'>
            <div className=" mb-12">
                <h2 className="text-3xl font-bold text-white mb-3">
                    Essential Tools I Use
                </h2>
                <p className="text-white max-w-2xl ">
                    Mastering modern technologies to create scalable, efficient, and
                    high-performing applications.
                </p>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map(({ image, name, des }, key) => (
                    <div
                        key={key}
                        className="bg-zinc-800/50 rounded-xl p-2 md:p-5 shadow-lg transition-all duration-300 hover:shadow-sky-500/20 hover:-translate-y-2 cursor-pointer"
                    >
                        <div className="flex items-center gap-4">

                            <figure className="bg-zinc-700/50 p-3 rounded-lg shadow-md ring-1 ring-zinc-500/20 transition-transform hover:scale-105">
                                <img
                                    src={image}
                                    alt={name}

                                    className="object-contain w-10 h-10"
                                />
                            </figure>
                            <div>
                                <h3 className="text-lg font-bold text-white">{name}</h3>
                                <p className="text-sm text-white">{des}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Skill
