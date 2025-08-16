const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const sendEmail = require('../services/emailService');
const logger = require('../config/logger');

const router = express.Router();

// Validation middleware
const validateContact = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
  body('phone')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone number cannot exceed 20 characters'),
  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name cannot exceed 100 characters')
];

// Submit contact form
router.post('/', validateContact, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, email, subject, message, phone, company } = req.body;

    // Get client information
    const ipAddress = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];
    const userAgent = req.headers['user-agent'];

    // Create contact record
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      phone,
      company,
      ipAddress,
      userAgent
    });

    // Save to database
    await contact.save();
    logger.info(`New contact form submission from ${email}`);

    // Send email notification to admin
    try {
      await sendEmail.sendContactNotification(contact);
      contact.emailSent = true;
      contact.emailSentAt = new Date();
      await contact.save();
      logger.info(`Contact notification email sent for ${email}`);
    } catch (emailError) {
      logger.error(`Failed to send contact notification email: ${emailError.message}`);
      // Don't fail the request if email fails
    }

    // Send auto-reply to user
    try {
      await sendEmail.sendAutoReply(contact);
      contact.autoReplySent = true;
      contact.autoReplySentAt = new Date();
      await contact.save();
      logger.info(`Auto-reply sent to ${email}`);
    } catch (autoReplyError) {
      logger.error(`Failed to send auto-reply: ${autoReplyError.message}`);
      // Don't fail the request if auto-reply fails
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! I\'ll get back to you soon.',
      data: {
        id: contact._id,
        submittedAt: contact.createdAt
      }
    });

  } catch (error) {
    logger.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
});

// Get contact statistics (admin only)
router.get('/stats', async (req, res) => {
  try {
    const stats = await Contact.getStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    logger.error('Error fetching contact stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
});

// Get all contacts (admin only)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, priority, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const contacts = await Contact.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalContacts: total,
          hasNextPage: page * limit < total,
          hasPrevPage: page > 1
        }
      }
    });

  } catch (error) {
    logger.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
});

// Get single contact by ID (admin only)
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });

  } catch (error) {
    logger.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact'
    });
  }
});

// Update contact status (admin only)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'read', 'replied', 'spam'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    logger.info(`Contact ${contact._id} status updated to ${status}`);

    res.json({
      success: true,
      data: contact
    });

  } catch (error) {
    logger.error('Error updating contact status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact status'
    });
  }
});

// Delete contact (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    logger.info(`Contact ${contact._id} deleted`);

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });

  } catch (error) {
    logger.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact'
    });
  }
});

module.exports = router;
