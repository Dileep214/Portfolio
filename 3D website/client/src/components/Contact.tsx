import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate API call - replace with actual endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        toast.success('Message sent successfully!')
        reset()
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      setSubmitStatus('error')
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "dileepkomarthi@gmail.com",
      link: "mailto:dileepkomarthi@gmail.com"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 98765 43210",
      link: "tel:+919876543210"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Hyderabad, Telangana, India",
      link: "#"
    }
  ]

  const socialLinks = [
    { name: "LinkedIn", url: "https://linkedin.com/in/dileep-kumar", color: "hover:text-blue-600" },
    { name: "GitHub", url: "https://github.com/dileep-kumar", color: "hover:text-gray-800 dark:hover:text-gray-200" },
    { name: "Twitter", url: "https://twitter.com/dileep-kumar", color: "hover:text-blue-400" },
    { name: "Instagram", url: "https://instagram.com/dileep-kumar", color: "hover:text-pink-500" }
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

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
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
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Ready to start a project or just want to chat? I'd love to hear from you!
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div variants={itemVariants} className="order-2 lg:order-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Send Message</h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-red-400 text-sm">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-red-400 text-sm">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    {...register('subject', { required: 'Subject is required' })}
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-red-400 text-sm">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 resize-none"
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-red-400 text-sm">{errors.message.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-green-400 bg-green-400/10 p-3 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Message sent successfully!
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg"
                  >
                    <AlertCircle className="w-5 h-5" />
                    Failed to send message. Please try again.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="order-1 lg:order-2">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.link}
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-300">{info.title}</h4>
                        <p className="text-white">{info.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4">Follow Me</h4>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={itemVariants}
                      whileHover={{ y: -2 }}
                      className={`px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 ${social.color}`}
                    >
                      {social.name}
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h4 className="text-xl font-semibold mb-4">Let's Work Together</h4>
                <p className="text-gray-300 mb-4">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </p>
                <p className="text-gray-300">
                  Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
