// Static project data is preserved here as a fallback while the app loads projects from the backend API.
export const projects = [
  {
    id: 1,
    slug: "real-time-ride-booking-app",
    title: "Ride Booking Web Application",
    subtitle: "Full-Stack Project",
    role: "Full-Stack Developer",
    duration: "3 Weeks",
    status: "Completed",

    description:
      "A real-time ride booking platform with live driver tracking, authentication, and socket-based updates inspired by Uber’s core flow.",

    overview:
      "This project replicates the core flow of a real-time ride booking system similar to Uber. The focus was on real-time communication, scalable backend architecture, and map-based interactions. The project helped in understanding how production-grade applications handle live synchronization between multiple users.",

    problem:
      "Ride booking systems require real-time synchronization between users and drivers. Managing live location updates, ride status changes, and concurrent users becomes complex when scalability and performance are considered.",

    solution:
      "Built a MERN-based real-time system using Socket.io for instant updates, JWT authentication for secure access, and Google Maps API for live driver tracking and route visualization.",

    architecture:
      "The application follows a client–server architecture. REST APIs handle standard operations like authentication and ride creation, while Socket.io manages real-time ride updates. MongoDB stores users, drivers, and ride data, and socket rooms are used to isolate ride-specific events.",

    userFlow: [
      "User signs up or logs in",
      "User selects pickup and drop location using Google Maps",
      "Ride request is sent to the backend",
      "Nearby drivers receive the request in real time",
      "A driver accepts the ride",
      "Live driver location updates are streamed to the user",
      "Ride status updates until completion"
    ],

challenges:
  "Handling Google Maps API alongside real-time Socket.io updates was challenging. Frequent location updates caused unnecessary map re-renders, affecting performance. This was solved by updating only marker positions instead of reinitializing the map and by optimizing socket events to emit location changes efficiently.",

    technicalDecisions: [
      "Used Socket.io instead of polling to reduce server load and enable instant updates",
      "Implemented JWT-based authentication for secure session management",
      "Separated REST APIs and real-time socket logic for better maintainability",
      "Used socket rooms to avoid unnecessary global event broadcasts"
    ],

    realTimeLogic:
      "Each ride is assigned a unique socket room. Only users and drivers involved in that ride receive updates. This prevents unnecessary data transfer and improves performance during concurrent rides.",

    security:
      "JWT authentication is used to protect routes on both frontend and backend. Ride-related operations are validated server-side to prevent unauthorized access and invalid state changes.",

    features: [
      "Real-time ride status updates",
      "User and driver authentication",
      "Live map tracking using Google Maps",
      "Socket-based notifications",
      "Secure backend APIs"
    ],

    techStack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io",
      "Google Maps API",
      "Tailwind CSS"
    ],

    learnings:
      "This project strengthened my understanding of real-time system design, socket lifecycle management, and scalable backend development. It also improved my ability to manage complex frontend state and optimize real-time performance.",

    images: [
      "/uber2.png",
      "/uber5.png",
       "/uber3.png",
    ],

    githubLink: "https://github.com/anisha-max/uber-clone",
    liveLink: "https://uber-clone-frontend-2ubg.onrender.com"
  },
{
  id: 2,
  slug: "video-streaming-platform",
  title: "Video Streaming Platform",
  subtitle: "Full-Stack Project",
  role: "Full-Stack Developer",
  duration: "2 Weeks",
  status: "In progress",

  description:
    "A scalable video streaming platform similar to YouTube, supporting video uploads, optimized playback, and secure user authentication.",

  overview:
    "This project focuses on building a full-stack video streaming platform with efficient media handling, authentication, and responsive UI. The goal was to understand how modern platforms manage large video files, optimize delivery, and ensure smooth playback across devices.",

  problem:
    "Video streaming platforms must handle large media uploads, ensure fast playback, and maintain a responsive UI while securely managing user authentication and data.",

  solution:
    "Built the platform using Next.js for performance , ImageKit for video optimization and delivery, NextAuth for secure authentication, and MongoDB for scalable data storage.",

  architecture:
    "The application follows a server-rendered architecture using Next.js. Media uploads are handled via ImageKit, which manages compression and CDN delivery. Authentication is managed by NextAuth, while MongoDB stores user and video metadata.",

  userFlow: [
    "User signs up or logs in",
    "Authenticated user uploads a video",
    "Video is processed and optimized by ImageKit",
    "Users browse and select videos",
    "Video is streamed with optimized delivery",
    "User profile displays uploaded videos"
  ],

  challenges:
    "Optimizing video loading speed while keeping the UI responsive was challenging. Handling large video uploads without blocking the UI and ensuring smooth playback across devices required careful media optimization and efficient state management.",

  technicalDecisions: [
    "Used Next.js for server-side rendering and faster initial page load",
    "Integrated ImageKit to offload video optimization and CDN delivery",
    "Used NextAuth for secure and scalable authentication",
    "Stored only video metadata in MongoDB to keep the database lightweight"
  ],

  mediaOptimization:
    "Videos are uploaded to ImageKit, which handles compression, adaptive delivery, and CDN caching. This significantly reduces load times and ensures smooth playback even on slower networks.",

  performance:
    "Improved performance by leveraging Next.js server-side rendering, lazy loading video components, and using ImageKit’s CDN for faster global content delivery.",

  security:
    "Authentication and protected routes are implemented using NextAuth. Upload and profile actions are restricted to authenticated users, and sensitive operations are validated server-side.",

  features: [
    "User authentication with NextAuth",
    "Video upload and playback",
    "Responsive UI across devices",
    "Optimized media delivery using ImageKit",
    "User profile with uploaded videos"
  ],

  techStack: [
    "Next.js",
    "Tailwind CSS",
    "ImageKit",
    "NextAuth",
    "MongoDB"
  ],

  learnings:
    "This project improved my understanding of large media handling, CDN-based delivery, authentication flows in Next.js, and performance optimization for media-heavy applications.",

  images: [
    "/videoapp.png",
    "/videoapp-2.png",
    "/videoapp-3.png"
  ],

  githubLink: "https://github.com/anisha-max/Fullstack-youtube-application",
  liveLink: "https://fullstack-video-application.onrender.com"
}
,

  // {
  //   id: 3,
  //   slug: "developer-portfolio",
  //   title: "Developer Portfolio",
  //   subtitle: "Frontend Project",
  //   role: "Frontend Developer",
  //   duration: "2 Weeks",
  //   status: "Completed",

  //   description:
  //     "A personal portfolio website showcasing projects, skills, and experience with a strong focus on performance and clean UI.",

  //   problem:
  //     "Most developer portfolios are cluttered, slow, and fail to clearly communicate skills to recruiters.",

  //   solution:
  //     "Designed a minimal, performance-focused portfolio with clear project case studies and smooth GSAP animations.",

  //   challenges:
  //     "Balancing animations with performance and keeping the design clean across screen sizes.",

  //   features: [
  //     "Clean and minimal UI",
  //     "Project case studies",
  //     "Smooth GSAP animations",
  //     "Fully responsive layout",
  //   ],

  //   techStack: ["React", "Tailwind CSS", "GSAP"],

  //   images: ["/portfolio.png"],

  //   githubLink: "https://github.com/anisha-max/Anisha-Parmar-WebDev",
  //   liveLink: "https://anisha-parmar-webdev.onrender.com",
  // },

{
  id: 4,
  slug: "fintech-web-application",
  title: "Fintech Web Application",
  subtitle: "Company Project",
  role: "Frontend Developer",
  duration: "Completed",
  status: "Live",

  description:
    "A production-grade fintech web application developed as part of a company project, focused on building secure, user-friendly, and scalable financial service interfaces.",

  overview:
    "This project involves developing and maintaining frontend interfaces for a fintech platform that handles multiple user flows and financial services. The primary focus is on UI clarity, component reusability, and maintaining consistency across a growing product.",

  problem:
    "Fintech applications involve complex user journeys and sensitive operations, which require interfaces that are both intuitive and consistent while minimizing user error.",

  solution:
    "Worked closely with designers and backend developers to build reusable React components and structured UI flows. Tailwind CSS was used to maintain a consistent design system and ensure responsiveness across devices.",

  responsibilities: [
    "Developing reusable and scalable React components",
    "Implementing responsive UI layouts using Tailwind CSS",
    "Ensuring UI consistency across different modules",
    "Collaborating with backend and design teams",
    "Fixing UI bugs and improving user experience"
  ],

  challenges:
    "Maintaining UI consistency across multiple features within an existing codebase was challenging. It required understanding existing design patterns, refactoring components where necessary, and aligning new features with the established UI system.",

  uiConsistency:
    "Followed a component-driven approach where shared UI elements were abstracted into reusable components. This reduced duplication and ensured a consistent look and behavior across the application.",

  performance:
    "Focused on lightweight components and clean state handling to keep the UI responsive, even as the application scaled with more features.",

  features: [
    "Clean and intuitive user interface",
    "Responsive design for desktop and mobile",
    "Reusable frontend components",
    "Consistent design system across modules"
  ],

  techStack: [
    "React",
    "Tailwind CSS"
  ],

  learnings:
    "This project strengthened my ability to work within an existing large-scale codebase, collaborate in a team environment, and build maintainable UI systems for real-world fintech applications.",

  images: [
    "/fintech1.png",
    "/fintech2.png", 
     "/fintech3.png",
  ],

  liveLink: "https://utility.finuniques.in"
}
,

{
  id: 5,
  slug: "company-main-website",
  title: "Company Main Website",
  subtitle: "Company Project",
  role: "Frontend Developer",
  duration: "Completed",
  status: "Live",

  description:
    "The official company website built with a strong focus on branding, responsiveness, performance, and a smooth user experience across all devices.",

  overview:
    "This project involves building and maintaining the company’s primary public-facing website. The goal is to clearly communicate the brand identity, services, and value proposition while ensuring fast load times and a polished user experience.",

  problem:
    "The company required a modern, responsive website that accurately reflected its brand, presented services clearly, and performed well across different devices and screen sizes.",

  solution:
    "Developed modular and responsive UI sections using React and Tailwind CSS. Worked closely with designers to translate brand guidelines into clean, reusable components while maintaining performance and consistency.",

  responsibilities: [
    "Developing responsive UI sections and layouts",
    "Implementing brand-consistent components",
    "Optimizing frontend performance",
    "Collaborating with designers and backend developers",
    "Maintaining UI consistency across pages"
  ],

  challenges:
    "Ensuring consistent design and performance across multiple pages while coordinating changes with designers and backend teams required careful component structuring and communication.",

  performance:
    "Focused on clean component structure, reusable layouts, and minimal CSS overhead to keep the website fast and responsive across devices.",

  features: [
    "Fully responsive layouts",
    "Modern, brand-focused UI design",
    "Optimized performance",
    "Reusable frontend components"
  ],

  techStack: [
    "React",
    "Tailwind CSS"
  ],

  learnings:
    "This project improved my ability to build brand-driven interfaces, collaborate across teams, and maintain a production website with real users and continuous updates.",

  futureImprovements: [
    "Improve accessibility and SEO",
    "Introduce subtle animations for better engagement",
    "Create a centralized design system",
    "Further optimize performance metrics"
  ],

  images: [
    "/sevenunique.png",
    "/sevenunique2.png",
    "/sevenunique3.png"
  ],

  liveLink: "https://www.sevenunique.com"
}
];
