import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Eye, Filter, Search, ArrowRight } from 'lucide-react'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProjects, setFilteredProjects] = useState<any[]>([])
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const projects = [
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
    },
    {
      id: 5,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, team collaboration, and progress tracking.",
      shortDescription: "Team collaboration task manager",
      image: "/assets/projects/task-manager.jpg",
      thumbnail: "/assets/projects/task-manager-thumb.jpg",
      techStack: ["React", "Socket.io", "Node.js", "PostgreSQL"],
      liveUrl: "https://task-manager-demo.com",
      githubUrl: "https://github.com/yourusername/task-manager",
      results: "30% improvement in team productivity, 85% user retention",
      featured: false,
      category: "Productivity"
    },
    {
      id: 6,
      title: "Weather Forecast App",
      description: "A beautiful weather application with location-based forecasts, detailed weather data, and interactive maps.",
      shortDescription: "Location-based weather forecasting",
      image: "/assets/projects/weather.jpg",
      thumbnail: "/assets/projects/weather-thumb.jpg",
      techStack: ["React Native", "OpenWeather API", "Redux", "TypeScript"],
      liveUrl: "https://weather-app-demo.com",
      githubUrl: "https://github.com/yourusername/weather-app",
      results: "4.8/5 app store rating, 100k+ downloads",
      featured: false,
      category: "Mobile"
    }
  ]

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))]

  useEffect(() => {
    let filtered = projects

    // Filter by category
    if (activeFilter !== 'all') {
      filtered = filtered.filter(project => project.category === activeFilter)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.techStack.some((tech: string) => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredProjects(filtered)
  }, [activeFilter, searchTerm])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  }

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  }

  return (
    <section id="projects" className="section-padding bg-accent-gray">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="heading-2">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="body-text-large max-w-3xl mx-auto">
              A showcase of my latest work, demonstrating technical skills and creative problem-solving
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors duration-300"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === category
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-white text-text-secondary hover:bg-primary-50 hover:text-primary-600 border border-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All Projects' : category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div variants={itemVariants} className="space-y-8">
            <AnimatePresence mode="wait">
              {filteredProjects.length > 0 ? (
                <motion.div
                  key={`${activeFilter}-${searchTerm}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      variants={cardVariants}
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      {/* Project Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={project.thumbnail || project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            target.nextElementSibling?.classList.remove('hidden')
                          }}
                        />
                        {/* Fallback Image */}
                        <div className="hidden w-full h-full bg-gradient-to-br from-primary-100 to-secondary-blue-100 flex items-center justify-center">
                          <span className="text-4xl font-bold text-primary-600">
                            {project.title.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        
                        {/* Featured Badge */}
                        {project.featured && (
                          <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                            ⭐ Featured
                          </div>
                        )}

                        {/* Category Badge */}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-text-primary px-3 py-1 rounded-full text-xs font-medium">
                          {project.category}
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-white rounded-full text-text-primary hover:text-primary-600 transition-colors duration-300"
                          >
                            <Eye className="w-5 h-5" />
                          </motion.a>
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-white rounded-full text-text-primary hover:text-primary-600 transition-colors duration-300"
                          >
                            <Github className="w-5 h-5" />
                          </motion.a>
                        </div>
                      </div>

                      {/* Project Content */}
                      <div className="p-6 space-y-4">
                        <h3 className="heading-3 text-lg">{project.title}</h3>
                        <p className="body-text text-sm">{project.shortDescription}</p>
                        
                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.slice(0, 4).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-primary-50 text-primary-600 text-xs rounded-full font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 4 && (
                            <span className="px-2 py-1 bg-gray-100 text-text-secondary text-xs rounded-full">
                              +{project.techStack.length - 4}
                            </span>
                          )}
                        </div>

                        {/* Results */}
                        <div className="text-xs text-text-secondary bg-gray-50 p-3 rounded-lg">
                          <strong>Results:</strong> {project.results}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 btn-primary text-sm py-2 flex items-center justify-center space-x-2"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="w-4 h-4" />
                          </motion.a>
                          
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center space-x-2"
                          >
                            <span>Code</span>
                            <Github className="w-4 h-4" />
                          </motion.a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="heading-3 mb-2">No projects found</h3>
                  <p className="body-text text-text-secondary">
                    Try adjusting your search or filter criteria
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* View All Projects CTA */}
          <motion.div variants={itemVariants} className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 mx-auto"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
