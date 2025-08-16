const express = require('express');
const siteConfig = require('../config/site');
const logger = require('../config/logger');

const router = express.Router();

// Get all site configuration
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: siteConfig
    });
  } catch (error) {
    logger.error('Error fetching site config:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch site configuration'
    });
  }
});

// Get personal information
router.get('/personal', (req, res) => {
  try {
    res.json({
      success: true,
      data: siteConfig.personal
    });
  } catch (error) {
    logger.error('Error fetching personal info:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch personal information'
    });
  }
});

// Get social media links
router.get('/social', (req, res) => {
  try {
    res.json({
      success: true,
      data: siteConfig.social
    });
  } catch (error) {
    logger.error('Error fetching social links:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch social media links'
    });
  }
});

// Get skills information
router.get('/skills', (req, res) => {
  try {
    res.json({
      success: true,
      data: siteConfig.skills
    });
  } catch (error) {
    logger.error('Error fetching skills:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch skills information'
    });
  }
});

// Get projects
router.get('/projects', (req, res) => {
  try {
    const { featured, category, limit } = req.query;
    let projects = siteConfig.projects;

    // Filter by featured status
    if (featured === 'true') {
      projects = projects.filter(project => project.featured);
    }

    // Filter by category
    if (category) {
      projects = projects.filter(project => 
        project.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply limit
    if (limit) {
      projects = projects.slice(0, parseInt(limit));
    }

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    logger.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    });
  }
});

// Get single project by ID
router.get('/projects/:id', (req, res) => {
  try {
    const project = siteConfig.projects.find(p => p.id === parseInt(req.params.id));
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    logger.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project'
    });
  }
});

// Get experience
router.get('/experience', (req, res) => {
  try {
    res.json({
      success: true,
      data: siteConfig.experience
    });
  } catch (error) {
    logger.error('Error fetching experience:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch experience'
    });
  }
});

// Get education
router.get('/education', (req, res) => {
  try {
    res.json({
      success: true,
      data: siteConfig.education
    });
  } catch (error) {
    logger.error('Error fetching education:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch education'
    });
  }
});

// Get contact configuration
router.get('/contact', (req, res) => {
  try {
    res.json({
      success: true,
      data: siteConfig.contact
    });
  } catch (error) {
    logger.error('Error fetching contact config:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact configuration'
    });
  }
});

// Get SEO configuration
router.get('/seo', (req, res) => {
  try {
    res.json({
      success: true,
      data: siteConfig.seo
    });
  } catch (error) {
    logger.error('Error fetching SEO config:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch SEO configuration'
    });
  }
});

// Get project categories
router.get('/categories', (req, res) => {
  try {
    const categories = [...new Set(siteConfig.projects.map(project => project.category))];
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    logger.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project categories'
    });
  }
});

// Search projects
router.get('/search', (req, res) => {
  try {
    const { q, tech, category } = req.query;
    let results = siteConfig.projects;

    // Text search
    if (q) {
      const searchTerm = q.toLowerCase();
      results = results.filter(project => 
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.shortDescription.toLowerCase().includes(searchTerm) ||
        project.techStack.some(tech => tech.toLowerCase().includes(searchTerm))
      );
    }

    // Filter by technology
    if (tech) {
      const techTerm = tech.toLowerCase();
      results = results.filter(project =>
        project.techStack.some(technology => 
          technology.toLowerCase().includes(techTerm)
        )
      );
    }

    // Filter by category
    if (category) {
      results = results.filter(project => 
        project.category.toLowerCase() === category.toLowerCase()
      );
    }

    res.json({
      success: true,
      data: {
        results,
        total: results.length,
        query: { q, tech, category }
      }
    });
  } catch (error) {
    logger.error('Error searching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search projects'
    });
  }
});

module.exports = router;
