import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Play, Download, ArrowRight } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const Hero = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const typingTexts = [
    "Full-Stack Developer",
    "AI Video Creator", 
    "UI/UX Designer",
    "Problem Solver"
  ]

  const typingSpeed = 100
  const deletingSpeed = 50
  const pauseTime = 2000

  useEffect(() => {
    if (!inView) return

    let timeout: NodeJS.Timeout

    if (isDeleting) {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, deletingSpeed)
      } else {
        setIsDeleting(false)
        setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length)
      }
    } else {
      if (displayText.length < typingTexts[currentTextIndex].length) {
        timeout = setTimeout(() => {
          setDisplayText(typingTexts[currentTextIndex].slice(0, displayText.length + 1))
        }, typingSpeed)
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, pauseTime)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentTextIndex, inView, typingTexts])

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const heroVariants = {
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

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          onLoadedData={() => setIsVideoLoaded(true)}
          style={{ opacity: isVideoLoaded ? 1 : 0 }}
        >
          <source src="/assets/hero-background.webm" type="video/webm" />
          <source src="/assets/hero-background.mp4" type="video/mp4" />
        </video>
        
        {/* Fallback gradient background */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-secondary-blue to-purple-600" />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <motion.div
          ref={ref}
          variants={heroVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto px-4"
        >
          {/* Main Heading */}
          <motion.h1 variants={itemVariants} className="heading-1 text-white mb-6">
            Komarthi Dileep Kumar
          </motion.h1>

          {/* Typing Subtitle */}
          <motion.div variants={itemVariants} className="mb-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-200 mb-2">
              I'm a{' '}
              <span className="text-primary-400 font-semibold">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </h2>
          </motion.div>

          {/* Achievements */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3">
              <span className="text-yellow-400">🚀</span>
              <span className="text-sm sm:text-base">5+ Years Experience</span>
              <span className="text-white/60">•</span>
              <span className="text-green-400">💻</span>
              <span className="text-sm sm:text-base">50+ Projects Delivered</span>
              <span className="text-white/60">•</span>
              <span className="text-blue-400">🎯</span>
              <span className="text-sm sm:text-base">AI-Powered Solutions</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
            >
              <span>Explore Portfolio</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('/assets/resume.pdf', '_blank')}
              className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2 border-white text-white hover:bg-white hover:text-primary-600"
            >
              <Download className="w-5 h-5" />
              <span>Download Resume</span>
            </motion.button>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            variants={floatingVariants}
            animate="float"
            className="absolute top-20 left-10 hidden lg:block"
          >
            <div className="w-20 h-20 bg-primary-400/20 rounded-full backdrop-blur-md border border-primary-400/30" />
          </motion.div>

          <motion.div
            variants={floatingVariants}
            animate="float"
            style={{ animationDelay: '1s' }}
            className="absolute top-40 right-20 hidden lg:block"
          >
            <div className="w-16 h-16 bg-secondary-blue/20 rounded-full backdrop-blur-md border border-secondary-blue/30" />
          </motion.div>

          <motion.div
            variants={floatingVariants}
            animate="float"
            style={{ animationDelay: '2s' }}
            className="absolute bottom-40 left-20 hidden lg:block"
          >
            <div className="w-12 h-12 bg-purple-400/20 rounded-full backdrop-blur-md border border-purple-400/30" />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={scrollToNext}
          whileHover={{ y: 5 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center space-y-2 text-white/80 hover:text-white transition-colors duration-300"
        >
          <span className="text-sm font-medium">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Glow Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-secondary-blue/10 rounded-full blur-2xl" />
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl" />
      </div>
    </section>
  )
}

export default Hero
