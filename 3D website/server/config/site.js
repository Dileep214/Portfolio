// Site Configuration - Easy to update portfolio information
const siteConfig = {
  // Personal Information
  personal: {
    name: "Komarthi Dileep Kumar",
    title: "Full-Stack Web Developer | AI Video Creator | UI/UX Designer",
    shortTitle: "Full-Stack Developer",
    location: "Gullipadu, India",
    email: "dileepkomarthi@gmail.com",
    phone: "+91 98765 43210",
    bio: "Hello! I'm Dileep from Gullipadu, a passionate web developer and AI enthusiast. I love creating innovative digital experiences that combine cutting-edge web technologies with artificial intelligence. My journey in tech has led me to explore everything from responsive web design to AI-powered video creation tools.",
    longBio: "When I'm not coding, you'll find me experimenting with new AI tools, designing user interfaces, or exploring the latest trends in web development. I believe in creating solutions that not only look great but also provide exceptional user experiences.",
    achievements: "🚀 5+ Years Experience | 💻 50+ Projects Delivered | 🎯 AI-Powered Solutions",
    resumeUrl: "https://drive.google.com/file/d/your-resume-id/view",
    profileImage: "/assets/profile.jpg"
  },

  // Social Media Links
  social: {
    linkedin: "https://linkedin.com/in/your-linkedin",
    github: "https://github.com/your-github",
    twitter: "https://twitter.com/your-twitter",
    instagram: "https://instagram.com/your-instagram",
    youtube: "https://youtube.com/@your-channel",
    behance: "https://behance.net/your-profile"
  },

  // Skills Configuration
  skills: {
    categories: [
      {
        name: "Frontend Development",
        icon: "💻",
        description: "HTML5, CSS3, JavaScript, React, Responsive Design",
        skills: ["HTML5", "CSS3", "JavaScript", "React", "TypeScript", "TailwindCSS", "Next.js"]
      },
      {
        name: "Backend Development",
        icon: "⚙️",
        description: "Java, Python, Node.js, SQL, RESTful APIs",
        skills: ["Java", "Python", "Node.js", "Express.js", "SQL", "MongoDB", "PostgreSQL"]
      },
      {
        name: "AI & Automation",
        icon: "🤖",
        description: "AI Video Creation, Machine Learning, Python Automation",
        skills: ["Machine Learning", "TensorFlow", "OpenAI API", "Python Automation", "AI Video Tools"]
      },
      {
        name: "Design & UX",
        icon: "🎨",
        description: "UI/UX Design, Figma, Adobe Creative Suite, 3D Design",
        skills: ["UI/UX Design", "Figma", "Adobe Creative Suite", "3D Design", "Spline"]
      }
    ],
    technical: [
      { name: "HTML", level: 95, description: "Semantic markup & accessibility" },
      { name: "CSS", level: 90, description: "Responsive design & animations" },
      { name: "JavaScript", level: 88, description: "ES6+ & modern frameworks" },
      { name: "Java", level: 85, description: "Object-oriented programming" },
      { name: "Python", level: 82, description: "Data science & automation" },
      { name: "SQL", level: 80, description: "Database design & queries" },
      { name: "React", level: 85, description: "Modern frontend development" },
      { name: "Node.js", level: 80, description: "Backend development" }
    ]
  },

  // Projects Configuration
  projects: [
    {
      id: 1,
      title: "AI Video Creator Platform",
      description: "A comprehensive web application that leverages AI to generate and edit videos. Features include automated editing, style transfer, and real-time preview.",
      shortDescription: "AI-powered video creation and editing platform",
      image: "/assets/projects/ai-video-creator.jpg",
      thumbnail: "/assets/projects/ai-video-creator-thumb.jpg",
      techStack: ["Python", "TensorFlow", "React", "Node.js", "MongoDB"],
      liveUrl: "https://ai-video-creator.com",
      githubUrl: "https://github.com/yourusername/ai-video-creator",
      results: "40% faster video processing, 95% user satisfaction rate",
      featured: true,
      category: "AI/ML"
    },
    {
      id: 2,
      title: "Modern E-Commerce Website",
      description: "A fully responsive e-commerce platform with advanced filtering, shopping cart functionality, and secure payment integration.",
      shortDescription: "Full-featured e-commerce platform",
      image: "/assets/projects/ecommerce.jpg",
      thumbnail: "/assets/projects/ecommerce-thumb.jpg",
      techStack: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
      liveUrl: "https://ecommerce-demo.com",
      githubUrl: "https://github.com/yourusername/ecommerce",
      results: "60% increase in conversion rate, 99.9% uptime",
      featured: true,
      category: "E-Commerce"
    },
    {
      id: 3,
      title: "Analytics Dashboard",
      description: "An interactive dashboard with real-time data visualization, customizable widgets, and comprehensive reporting features.",
      shortDescription: "Interactive data visualization dashboard",
      image: "/assets/projects/dashboard.jpg",
      thumbnail: "/assets/projects/dashboard-thumb.jpg",
      techStack: ["React", "D3.js", "Node.js", "MongoDB"],
      liveUrl: "https://analytics-demo.com",
      githubUrl: "https://github.com/yourusername/analytics-dashboard",
      results: "50% reduction in data analysis time, 80% user adoption",
      featured: true,
      category: "Analytics"
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website built with React and Node.js, featuring smooth animations and interactive elements.",
      shortDescription: "Modern portfolio website",
      image: "/assets/projects/portfolio.jpg",
      thumbnail: "/assets/projects/portfolio-thumb.jpg",
      techStack: ["React", "Node.js", "MongoDB", "TailwindCSS"],
      liveUrl: "https://dileep-portfolio.com",
      githubUrl: "https://github.com/yourusername/portfolio",
      results: "90+ Lighthouse score, 100% responsive design",
      featured: false,
      category: "Portfolio"
    }
  ],

  // Experience Configuration
  experience: [
    {
      id: 1,
      title: "Senior Full-Stack Developer",
      company: "Tech Solutions Inc.",
      period: "2022 - Present",
      description: "Leading development of web applications using React, Node.js, and MongoDB. Mentoring junior developers and implementing best practices.",
      achievements: ["Led 10+ projects", "Improved team productivity by 30%", "Reduced bug reports by 40%"],
      techStack: ["React", "Node.js", "MongoDB", "AWS"]
    },
    {
      id: 2,
      title: "Web Developer",
      company: "Digital Creations",
      period: "2020 - 2022",
      description: "Developed responsive websites and e-commerce platforms. Collaborated with designers to create user-friendly interfaces.",
      achievements: ["Built 20+ websites", "Achieved 95% client satisfaction", "Optimized loading speed by 50%"],
      techStack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"]
    },
    {
      id: 3,
      title: "Junior Developer",
      company: "Startup Studio",
      period: "2019 - 2020",
      description: "Assisted in development of various web applications. Learned modern web technologies and best practices.",
      achievements: ["Contributed to 5 projects", "Learned React and Node.js", "Improved code quality"],
      techStack: ["HTML", "CSS", "JavaScript", "Python"]
    }
  ],

  // Education Configuration
  education: [
    {
      id: 1,
      degree: "Bachelor of Technology in Computer Science",
      institution: "University of Technology",
      period: "2015 - 2019",
      description: "Studied computer science fundamentals, algorithms, data structures, and software engineering principles.",
      achievements: ["First Class with Distinction", "Best Project Award", "Technical Lead of Coding Club"]
    },
    {
      id: 2,
      degree: "Web Development Certification",
      institution: "Online Learning Platform",
      period: "2020",
      description: "Advanced web development course covering modern frameworks and best practices.",
      achievements: ["Completed with 95% score", "Built 3 full-stack projects", "Earned React certification"]
    }
  ],

  // Contact Configuration
  contact: {
    formEnabled: true,
    emailNotifications: true,
    autoReply: true,
    workingHours: "Monday - Friday, 9:00 AM - 6:00 PM IST",
    responseTime: "Within 24 hours",
    preferredContact: "Email for business inquiries, Phone for urgent matters"
  },

  // SEO Configuration
  seo: {
    title: "Komarthi Dileep Kumar - Full-Stack Developer Portfolio",
    description: "Professional portfolio of Komarthi Dileep Kumar, a Full-Stack Web Developer specializing in React, Node.js, and AI-powered solutions.",
    keywords: "full-stack developer, web developer, react developer, node.js developer, AI developer, portfolio",
    author: "Komarthi Dileep Kumar",
    ogImage: "/assets/og-image.jpg",
    twitterCard: "summary_large_image"
  }
};

module.exports = siteConfig;

