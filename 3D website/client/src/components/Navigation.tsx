import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled
      setIsScrolled(window.scrollY > 50)

      // Update active section
      const sections = navItems.map(item => item.id)
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeSection, navItems])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 80 // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
    setIsOpen(false)
  }

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
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

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    open: {
      opacity: 1,
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  }

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
          : 'bg-transparent'
      } ${theme === 'dark' ? 'dark' : ''}`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-blue rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl font-poppins">DK</span>
            </div>
            <span className="hidden sm:block font-poppins font-bold text-xl text-text-primary">
              Dileep Kumar
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                  activeSection === item.id
                    ? 'text-primary-600'
                    : 'text-text-secondary hover:text-primary-600'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right side - Theme toggle and CTA */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300 dark:bg-gray-800 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </motion.button>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className="hidden sm:block btn-primary"
            >
              Get In Touch
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-text-primary" />
              ) : (
                <Menu className="w-6 h-6 text-text-primary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/50 dark:bg-gray-900/95 dark:border-gray-700/50"
          >
            <div className="container-custom py-6">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left px-4 py-3 rounded-lg font-medium transition-colors duration-300 ${
                      activeSection === item.id
                        ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20'
                        : 'text-text-secondary hover:text-primary-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
                
                {/* Mobile CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection('contact')}
                  className="mt-4 btn-primary w-full"
                >
                  Get In Touch
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navigation
