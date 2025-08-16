import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Mail, Phone, Download, ExternalLink } from 'lucide-react'

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const personalInfo = {
    name: "Komarthi Dileep Kumar",
    title: "Full-Stack Web Developer | AI Video Creator | UI/UX Designer",
    location: "Gullipadu, India",
    email: "dileepkomarthi@gmail.com",
    phone: "+91 98765 43210",
    bio: "Hello! I'm Dileep from Gullipadu, a passionate web developer and AI enthusiast. I love creating innovative digital experiences that combine cutting-edge web technologies with artificial intelligence. My journey in tech has led me to explore everything from responsive web design to AI-powered video creation tools.",
    longBio: "When I'm not coding, you'll find me experimenting with new AI tools, designing user interfaces, or exploring the latest trends in web development. I believe in creating solutions that not only look great but also provide exceptional user experiences.",
    achievements: [
      "🚀 5+ Years Experience",
      "💻 50+ Projects Delivered", 
      "🎯 AI-Powered Solutions",
      "🌟 95% Client Satisfaction"
    ]
  }

  const socialLinks = [
    { name: "LinkedIn", url: "https://linkedin.com/in/your-linkedin", icon: "💼" },
    { name: "GitHub", url: "https://github.com/your-github", icon: "💻" },
    { name: "Twitter", url: "https://twitter.com/your-twitter", icon: "🐦" },
    { name: "Instagram", url: "https://instagram.com/your-instagram", icon: "📸" },
    { name: "YouTube", url: "https://youtube.com/@your-channel", icon: "🎥" },
    { name: "Behance", url: "https://behance.net/your-profile", icon: "🎨" }
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
    <section id="about" className="section-padding bg-accent-gray">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Section Header */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="heading-2">
                About <span className="gradient-text">Me</span>
              </h2>
              <p className="body-text-large">
                Passionate developer crafting digital experiences that make a difference
              </p>
            </motion.div>

            {/* Bio */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="body-text">{personalInfo.bio}</p>
              <p className="body-text">{personalInfo.longBio}</p>
            </motion.div>

            {/* Achievements */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              {personalInfo.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                >
                  <span className="text-2xl">{achievement.split(' ')[0]}</span>
                  <span className="text-sm font-medium text-text-secondary">
                    {achievement.split(' ').slice(1).join(' ')}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center space-x-3 text-text-secondary">
                <MapPin className="w-5 h-5 text-primary-600" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center space-x-3 text-text-secondary">
                <Mail className="w-5 h-5 text-primary-600" />
                <span>{personalInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-text-secondary">
                <Phone className="w-5 h-5 text-primary-600" />
                <span>{personalInfo.phone}</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('/assets/resume.pdf', '_blank')}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <span>Get In Touch</span>
                <ExternalLink className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>

          {/* Right Column - Profile & Social */}
          <div className="space-y-8">
            {/* Profile Image */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-blue rounded-full blur-3xl opacity-20 animate-pulse" />
                
                {/* Profile Image Container */}
                <div className="relative w-full h-full bg-gradient-to-br from-primary-600 to-secondary-blue rounded-full p-2">
                  <div className="w-full h-full bg-white rounded-full overflow-hidden">
                    <img
                      src="/assets/profile.jpg"
                      alt="Komarthi Dileep Kumar"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        target.nextElementSibling?.classList.remove('hidden')
                      }}
                    />
                    {/* Fallback Avatar */}
                    <div className="hidden w-full h-full bg-gradient-to-br from-primary-100 to-secondary-blue-100 flex items-center justify-center">
                      <span className="text-6xl font-bold text-primary-600 font-poppins">
                        {personalInfo.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ 
                    y: [-10, 10, -10],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400/20 rounded-full backdrop-blur-md border border-yellow-400/30 flex items-center justify-center"
                >
                  <span className="text-2xl">🚀</span>
                </motion.div>

                <motion.div
                  animate={{ 
                    y: [10, -10, 10],
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-400/20 rounded-full backdrop-blur-md border border-green-400/30 flex items-center justify-center"
                >
                  <span className="text-xl">💻</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="heading-3 text-center">Connect With Me</h3>
              <div className="grid grid-cols-3 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={cardVariants}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="group p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 text-center"
                  >
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </div>
                    <span className="text-sm font-medium text-text-secondary group-hover:text-primary-600 transition-colors duration-300">
                      {social.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
