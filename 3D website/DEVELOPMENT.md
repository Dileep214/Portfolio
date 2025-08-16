# Development Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB (for backend)

### Installation

1. **Clone and install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client && npm install
   
   # Install server dependencies
   cd ../server && npm install
   ```

2. **Environment Setup**
   ```bash
   # Copy server environment file
   cp server/env.example server/.env
   
   # Edit server/.env with your credentials
   MONGODB_URI=your_mongodb_connection_string
   GMAIL_USER=your_gmail@gmail.com
   GMAIL_PASS=your_app_password
   JWT_SECRET=your_jwt_secret
   ```

3. **Start Development Servers**
   ```bash
   # From root directory
   npm run dev
   
   # Or start individually:
   npm run dev:client  # Frontend on http://localhost:3000
   npm run dev:server  # Backend on http://localhost:5000
   ```

## 📁 Project Structure

```
dileep-portfolio/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # All React components
│   │   ├── contexts/       # React contexts (Theme)
│   │   ├── hooks/          # Custom hooks
│   │   └── main.tsx        # Entry point
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── server/                 # Node.js backend
│   ├── routes/            # API routes
│   ├── models/            # Database models
│   ├── config/            # Configuration files
│   └── index.js           # Server entry point
└── package.json            # Root scripts
```

## 🎨 Components Overview

### Frontend Components
- **Hero**: 3D video background with typing animation
- **Navigation**: Responsive navbar with theme toggle
- **About**: Personal information and story
- **Skills**: Technical skills with progress bars
- **Projects**: Portfolio projects showcase
- **Experience**: Work experience timeline
- **Contact**: Contact form and information
- **Footer**: Links and social media
- **ScrollToTop**: Smooth scroll to top button

### Backend Features
- **Contact API**: Email sending via Gmail
- **Database**: MongoDB integration
- **Security**: Rate limiting, CORS, Helmet
- **Logging**: Winston logger
- **Validation**: Input validation and sanitization

## 🔧 Development Commands

```bash
# Install all dependencies
npm run install-all

# Start development servers
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Type checking (client)
cd client && npm run type-check
```

## 🌐 Environment Variables

### Server (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dileep-portfolio
GMAIL_USER=your_email@gmail.com
GMAIL_PASS=your_app_password
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:3000
```

### Client (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_SITE_URL=http://localhost:3000
```

## 🎯 Key Features

- **3D Video Background**: Hero section with WebM/MP4 support
- **Dark/Light Theme**: Automatic system preference detection
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Framer Motion integration
- **Contact Form**: Real email sending capability
- **Performance**: Optimized with lazy loading
- **SEO**: Meta tags and structured data

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy dist/ folder
```

### Backend (Render/Heroku)
```bash
cd server
npm start
# Deploy with environment variables
```

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**: Change ports in .env files
2. **MongoDB connection**: Ensure MongoDB is running
3. **Gmail authentication**: Use App Password, not regular password
4. **Build errors**: Check TypeScript compilation

### Development Tips

- Use the provided scripts for easy development
- Check browser console for frontend errors
- Monitor server logs for backend issues
- Use React DevTools for component debugging

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

---

**Happy Coding! 🎉**
