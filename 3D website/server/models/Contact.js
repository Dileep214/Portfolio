const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'read', 'replied', 'spam'],
    default: 'pending'
  },
  emailSent: {
    type: Boolean,
    default: false
  },
  emailSentAt: {
    type: Date
  },
  autoReplySent: {
    type: Boolean,
    default: false
  },
  autoReplySentAt: {
    type: Date
  },
  tags: [{
    type: String,
    enum: ['job-inquiry', 'project-request', 'general', 'collaboration', 'feedback']
  }],
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for better query performance
contactSchema.index({ email: 1, createdAt: -1 });
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ tags: 1 });

// Virtual for time since submission
contactSchema.virtual('timeSinceSubmission').get(function() {
  return Date.now() - this.createdAt;
});

// Pre-save middleware to set priority based on content
contactSchema.pre('save', function(next) {
  const urgentKeywords = ['urgent', 'asap', 'immediate', 'emergency', 'hiring', 'job'];
  const highKeywords = ['project', 'work', 'collaboration', 'partnership'];
  
  const messageLower = this.message.toLowerCase();
  const subjectLower = this.subject.toLowerCase();
  
  if (urgentKeywords.some(keyword => 
    messageLower.includes(keyword) || subjectLower.includes(keyword)
  )) {
    this.priority = 'urgent';
  } else if (highKeywords.some(keyword => 
    messageLower.includes(keyword) || subjectLower.includes(keyword)
  )) {
    this.priority = 'high';
  }
  
  next();
});

// Static method to get contact statistics
contactSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        pending: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } },
        read: { $sum: { $cond: [{ $eq: ['$status', 'read'] }, 1, 0] } },
        replied: { $sum: { $cond: [{ $eq: ['$status', 'replied'] }, 1, 0] } },
        urgent: { $sum: { $cond: [{ $eq: ['$priority', 'urgent'] }, 1, 0] } }
      }
    }
  ]);
  
  return stats[0] || { total: 0, pending: 0, read: 0, replied: 0, urgent: 0 };
};

// Instance method to mark as read
contactSchema.methods.markAsRead = function() {
  this.status = 'read';
  return this.save();
};

// Instance method to mark as replied
contactSchema.methods.markAsReplied = function() {
  this.status = 'replied';
  this.emailSent = true;
  this.emailSentAt = new Date();
  return this.save();
};

module.exports = mongoose.model('Contact', contactSchema);

