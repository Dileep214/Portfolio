import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, MapPin, Building, ExternalLink } from 'lucide-react'

const Experience = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const experiences = [
    {
      id: 1,
      title: "Senior Full-Stack Developer",
      company: "TechCorp Solutions",
      location: "Hyderabad, India",
      period: "Jan 2023 - Present",
      description: "Leading development of enterprise web applications using React, Node.js, and MongoDB. Mentoring junior developers and implementing CI/CD pipelines.",
      technologies: ["React", "Node.js", "MongoDB", "AWS", "Docker"],
      achievements: [
        "Reduced application load time by 40% through optimization",
        "Led a team of 5 developers on 3 major projects",
        "Implemented automated testing increasing coverage to 85%"
      ]
    },
    {
      id: 2,
      title: "Full-Stack Developer",
      company: "InnovateTech",
      location: "Bangalore, India",
      period: "Mar 2021 - Dec 2022",
      description: "Developed and maintained multiple client websites and web applications. Collaborated with design and product teams to deliver high-quality solutions.",
      technologies: ["React", "Express.js", "PostgreSQL", "Redux", "TypeScript"],
      achievements: [
        "Delivered 15+ client projects on time and within budget",
        "Improved user engagement by 25% through UI/UX enhancements",
        "Reduced bug reports by 30% through better testing practices"
      ]
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "WebSolutions Inc",
      location: "Chennai, India",
      period: "Jun 2020 - Feb 2021",
      description: "Built responsive user interfaces and implemented modern web technologies. Worked closely with backend developers to ensure seamless integration.",
      technologies: ["HTML", "CSS", "JavaScript", "React", "Bootstrap"],
      achievements: [
        "Developed 10+ responsive websites for various clients",
        "Optimized website performance achieving 90+ Lighthouse scores",
        "Collaborated with 3 backend developers on full-stack projects"
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
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

  const timelineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Professional Experience
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            My journey in software development, from building my first website to leading enterprise applications
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            variants={timelineVariants}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-x-1/2 hidden md:block"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-12"
          >
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                variants={itemVariants}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-slate-800 transform -translate-x-1/2 top-6 md:top-8 z-10" />

                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    {/* Header */}
                    <div className={`flex flex-col gap-3 ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {experience.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                        <Building className="w-5 h-5" />
                        <span className="font-semibold">{experience.company}</span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{experience.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{experience.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                      {experience.description}
                    </p>

                    {/* Technologies */}
                    <div className={`mt-6 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                        Technologies Used
                      </h4>
                      <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                        {experience.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                        Key Achievements
                      </h4>
                      <ul className={`space-y-2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                        {experience.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300"
          >
            Let's Work Together
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
