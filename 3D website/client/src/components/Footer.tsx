import { motion } from 'framer-motion'
import { Heart, ArrowUp, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    quickLinks: [
      { name: "Home", href: "#home" },
      { name: "About", href: "#about" },
      { name: "Skills", href: "#skills" },
      { name: "Projects", href: "#projects" },
      { name: "Experience", href: "#experience" },
      { name: "Contact", href: "#contact" }
    ],
    services: [
      { name: "Web Development", href: "#" },
      { name: "Mobile Apps", href: "#" },
      { name: "UI/UX Design", href: "#" },
      { name: "Consulting", href: "#" }
    ],
    social: [
      { name: "LinkedIn", href: "https://linkedin.com/in/dileep-kumar", icon: "🔗" },
      { name: "GitHub", href: "https://github.com/dileep-kumar", icon: "🐙" },
      { name: "Twitter", href: "https://twitter.com/dileep-kumar", icon: "🐦" },
      { name: "Instagram", href: "https://instagram.com/dileep-kumar", icon: "📷" }
    ]
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

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
    hidden: { y: 20, opacity: 0 },
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

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid lg:grid-cols-4 md:grid-cols-2 gap-8"
          >
            {/* Company Info */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Dileep Kumar
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Full-Stack Developer passionate about creating innovative web solutions and delivering exceptional user experiences.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">dileepkomarthi@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">Hyderabad, India</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2">
                {footerLinks.quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-4 text-white">Services</h4>
              <ul className="space-y-2">
                {footerLinks.services.map((service, index) => (
                  <li key={index}>
                    <a
                      href={service.href}
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                    >
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-4 text-white">Connect</h4>
              <div className="flex flex-wrap gap-3">
                {footerLinks.social.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 transition-all duration-300"
                  >
                    <span className="text-lg">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-white/20"
          >
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-4">Stay Updated</h4>
              <p className="text-gray-300 mb-6 max-w-md mx-auto">
                Subscribe to my newsletter for the latest insights on web development and tech trends.
              </p>
              
              <div className="flex max-w-md mx-auto gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-gray-400 text-sm text-center md:text-left"
              >
                © {currentYear} Komarthi Dileep Kumar. All rights reserved.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 text-gray-400 text-sm"
              >
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>in India</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  )
}

export default Footer
