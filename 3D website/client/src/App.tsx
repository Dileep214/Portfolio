import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTheme } from './hooks/useTheme'
import { ThemeProvider } from './contexts/ThemeContext'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

function App() {
  const { theme } = useTheme()

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-background-dark text-text-light' : 'bg-background-light text-text-primary'
    }`}>
      <Helmet>
        <title>Komarthi Dileep Kumar - Full-Stack Developer Portfolio</title>
        <meta name="description" content="Professional portfolio of Komarthi Dileep Kumar, a Full-Stack Web Developer specializing in React, Node.js, and AI-powered solutions." />
        <meta name="keywords" content="full-stack developer, web developer, react developer, node.js developer, AI developer, portfolio" />
        <meta name="author" content="Komarthi Dileep Kumar" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Komarthi Dileep Kumar - Full-Stack Developer Portfolio" />
        <meta property="og:description" content="Professional portfolio of Komarthi Dileep Kumar, a Full-Stack Web Developer specializing in React, Node.js, and AI-powered solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dileep-portfolio.com" />
        <meta property="og:image" content="/assets/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Komarthi Dileep Kumar - Full-Stack Developer Portfolio" />
        <meta name="twitter:description" content="Professional portfolio of Komarthi Dileep Kumar, a Full-Stack Web Developer specializing in React, Node.js, and AI-powered solutions." />
        <meta name="twitter:image" content="/assets/og-image.jpg" />
        
        {/* Theme */}
        <meta name="theme-color" content={theme === 'dark' ? '#0f172a' : '#2563eb'} />
        <meta name="color-scheme" content={theme === 'dark' ? 'dark' : 'light'} />
      </Helmet>

      <Navigation />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  )
}

function AppWrapper() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
}

export default AppWrapper
