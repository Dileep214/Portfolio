import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Palette, Database, Zap } from 'lucide-react'

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const skillCategories = [
    {
      name: "Frontend Development",
      icon: "💻",
      description: "HTML5, CSS3, JavaScript, React, Responsive Design",
      skills: ["HTML5", "CSS3", "JavaScript", "React", "TypeScript", "TailwindCSS", "Next.js"],
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Backend Development",
      icon: "⚙️",
      description: "Java, Python, Node.js, SQL, RESTful APIs",
      skills: ["Java", "Python", "Node.js", "Express.js", "SQL", "MongoDB", "PostgreSQL"],
      color: "from-green-500 to-green-600"
    },
    {
      name: "AI & Automation",
      icon: "🤖",
      description: "AI Video Creation, Machine Learning, Python Automation",
      skills: ["Machine Learning", "TensorFlow", "OpenAI API", "Python Automation", "AI Video Tools"],
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Design & UX",
      icon: "🎨",
      description: "UI/UX Design, Figma, Adobe Creative Suite, 3D Design",
      skills: ["UI/UX Design", "Figma", "Adobe Creative Suite", "3D Design", "Spline"],
      color: "from-pink-500 to-pink-600"
    }
  ]

  const technicalSkills = [
    { name: "HTML", level: 95, description: "Semantic markup & accessibility" },
    { name: "CSS", level: 90, description: "Responsive design & animations" },
    { name: "JavaScript", level: 88, description: "ES6+ & modern frameworks" },
    { name: "Java", level: 85, description: "Object-oriented programming" },
    { name: "Python", level: 82, description: "Data science & automation" },
    { name: "SQL", level: 80, description: "Database design & queries" },
    { name: "React", level: 85, description: "Modern frontend development" },
    { name: "Node.js", level: 80, description: "Backend development" }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
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

  const skillBarVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.2
      }
    })
  }

  const radarChartData = [
    { skill: "Frontend", value: 90 },
    { skill: "Backend", value: 85 },
    { skill: "Database", value: 80 },
    { skill: "AI/ML", value: 75 },
    { skill: "Design", value: 85 },
    { skill: "DevOps", value: 70 }
  ]

  const maxValue = Math.max(...radarChartData.map(d => d.value))
  const centerX = 150
  const centerY = 150
  const radius = 120

  const getRadarPoint = (index: number, value: number) => {
    const angle = (index * 2 * Math.PI) / radarChartData.length - Math.PI / 2
    const normalizedValue = value / maxValue
    const x = centerX + radius * normalizedValue * Math.cos(angle)
    const y = centerY + radius * normalizedValue * Math.sin(angle)
    return { x, y }
  }

  const radarPath = radarChartData.map((_, index) => {
    const point = getRadarPoint(index, radarChartData[index].value)
    return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  }).join(' ') + 'Z'

  return (
    <section id="skills" className="section-padding">
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
              My <span className="gradient-text">Skills</span>
            </h2>
            <p className="body-text-large max-w-3xl mx-auto">
              A comprehensive toolkit of technologies and methodologies I use to bring ideas to life
            </p>
          </motion.div>

          {/* Skills Categories */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="heading-3 text-center">Skill Categories</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skillCategories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer ${
                    activeCategory === index ? 'ring-2 ring-primary-500' : ''
                  }`}
                  onClick={() => setActiveCategory(index)}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 rounded-2xl`} />
                  
                  <div className="relative z-10 text-center space-y-4">
                    <div className="text-4xl">{category.icon}</div>
                    <h4 className="font-semibold text-text-primary">{category.name}</h4>
                    <p className="text-sm text-text-secondary">{category.description}</p>
                    
                    {/* Skills List */}
                    <div className="space-y-2">
                      {category.skills.slice(0, 4).map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className="text-xs bg-gray-50 text-text-secondary px-2 py-1 rounded-full"
                        >
                          {skill}
                        </div>
                      ))}
                      {category.skills.length > 4 && (
                        <div className="text-xs text-primary-600 font-medium">
                          +{category.skills.length - 4} more
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technical Skills with Bars */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="heading-3 text-center">Technical Proficiency</h3>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                {technicalSkills.slice(0, 4).map((skill, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-text-primary">{skill.name}</span>
                      <span className="text-sm text-text-secondary">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        custom={skill.level}
                        variants={skillBarVariants}
                        className="h-full bg-gradient-to-r from-primary-500 to-secondary-blue rounded-full"
                      />
                    </div>
                    <p className="text-xs text-text-secondary">{skill.description}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="space-y-6">
                {technicalSkills.slice(4).map((skill, index) => (
                  <motion.div
                    key={index + 4}
                    variants={itemVariants}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-text-primary">{skill.name}</span>
                      <span className="text-sm text-text-secondary">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        custom={skill.level}
                        variants={skillBarVariants}
                        className="h-full bg-gradient-to-r from-primary-500 to-secondary-blue rounded-full"
                      />
                    </div>
                    <p className="text-xs text-text-secondary">{skill.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Radar Chart */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="heading-3 text-center">Skills Overview</h3>
            <div className="flex justify-center">
              <div className="relative">
                <svg width="300" height="300" className="mx-auto">
                  {/* Background Grid */}
                  {[0.2, 0.4, 0.6, 0.8, 1].map((scale, index) => (
                    <circle
                      key={index}
                      cx={centerX}
                      cy={centerY}
                      r={radius * scale}
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="1"
                      opacity="0.5"
                    />
                  ))}

                  {/* Axis Lines */}
                  {radarChartData.map((_, index) => {
                    const angle = (index * 2 * Math.PI) / radarChartData.length - Math.PI / 2
                    const x = centerX + radius * Math.cos(angle)
                    const y = centerY + radius * Math.sin(angle)
                    return (
                      <line
                        key={index}
                        x1={centerX}
                        y1={centerY}
                        x2={x}
                        y2={y}
                        stroke="#e5e7eb"
                        strokeWidth="1"
                        opacity="0.5"
                      />
                    )
                  })}

                  {/* Skill Labels */}
                  {radarChartData.map((data, index) => {
                    const angle = (index * 2 * Math.PI) / radarChartData.length - Math.PI / 2
                    const x = centerX + (radius + 20) * Math.cos(angle)
                    const y = centerY + (radius + 20) * Math.sin(angle)
                    return (
                      <text
                        key={index}
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-xs font-medium fill-text-secondary"
                      >
                        {data.skill}
                      </text>
                    )
                  })}

                  {/* Radar Chart Path */}
                  <motion.path
                    d={radarPath}
                    fill="url(#radarGradient)"
                    fillOpacity="0.3"
                    stroke="url(#radarGradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />

                  {/* Data Points */}
                  {radarChartData.map((data, index) => {
                    const point = getRadarPoint(index, data.value)
                    return (
                      <motion.circle
                        key={index}
                        cx={point.x}
                        cy={point.y}
                        r="4"
                        fill="url(#radarGradient)"
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      />
                    )
                  })}

                  {/* Gradient Definition */}
                  <defs>
                    <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Additional Skills */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="heading-3 text-center">Tools & Technologies</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                "Git", "Docker", "AWS", "Figma", "Adobe XD", "Postman",
                "Jest", "Webpack", "Vite", "MongoDB", "PostgreSQL", "Redis"
              ].map((tool, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 text-center"
                >
                  <span className="text-sm font-medium text-text-secondary">{tool}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
