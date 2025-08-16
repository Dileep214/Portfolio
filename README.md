[README.md](https://github.com/user-attachments/files/21813748/README.md)
# Dileep Kumar Portfolio Website

A modern, interactive, and professional portfolio website built with React.js, Node.js, and MongoDB.

## 🚀 Features

- **Modern Design**: Clean, minimalistic design with premium aesthetics
- **3D Video Background**: Interactive 3D background in hero section
- **Fully Responsive**: Mobile-first design that works perfectly on all devices
- **Interactive Elements**: Smooth animations, hover effects, and micro-interactions
- **Functional Contact Form**: Sends emails directly to Gmail
- **Dark Mode Toggle**: Elegant theme switching
- **SEO Optimized**: Built for search engine visibility
- **Performance Focused**: Lighthouse score 90+ across all metrics

## 🛠️ Tech Stack

### Frontend
- React.js 18
- TailwindCSS
- Framer Motion (animations)
- TypeScript
- Vite (build tool)

### Backend
- Node.js
- Express.js
- MongoDB
- Nodemailer (email service)
- JWT (authentication)

## 📁 Project Structure

```
dileep-portfolio/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   ├── utils/         # Utility functions
│   │   └── assets/        # Images, videos, etc.
├── server/                 # Node.js backend
│   ├── routes/            # API routes
│   ├── models/            # Database models
│   ├── middleware/        # Custom middleware
│   └── config/            # Configuration files
├── config/                 # Configuration files
└── docs/                  # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB
- Gmail account (for contact form)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd dileep-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   ```bash
   # Copy environment files
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   
   # Edit server/.env with your credentials
   MONGODB_URI=your_mongodb_connection_string
   GMAIL_USER=your_gmail@gmail.com
   GMAIL_PASS=your_app_password
   JWT_SECRET=your_jwt_secret
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 📝 Configuration

### Easy Updates
All social links, project details, and personal information are stored in:
- `client/src/config/portfolio.ts` - Frontend configuration
- `server/config/site.js` - Backend configuration

### Customization
1. **Personal Info**: Update `portfolio.ts` with your details
2. **Projects**: Modify project data in the config file
3. **Skills**: Edit skills and categories
4. **Social Links**: Update all social media handles
5. **Styling**: Modify TailwindCSS classes in components

## 🎨 Design Features

### Color Palette
- **Primary**: Bright royal blue (#2563EB)
- **Secondary**: Soft sky blue (#60A5FA)
- **Background**: Pure white (#FFFFFF) with light gray (#F3F4F6)
- **Text**: Dark charcoal gray (#111827) for headings
- **Accent**: Muted lavender (#E0E7FF)

### Typography
- **Headings**: Poppins (bold, modern)
- **Body**: Inter (clean, readable)

### Animations
- Smooth scroll-triggered fade-ins
- Interactive hover effects
- Typing animation in hero section
- 3D video background
- Glow cursor effects

## 📱 Responsive Design

- **Mobile-first approach**
- **Breakpoints**: 320px, 768px, 1024px, 1440px
- **Touch-friendly** tap targets
- **Optimized** for all screen sizes

## 🔧 Performance Optimization

- **Lazy loading** for images and videos
- **Code splitting** with React.lazy()
- **Optimized 3D assets** (compressed WebM/MP4)
- **Minified CSS/JS** for production
- **CDN integration** for external resources

## 📧 Contact Form

The contact form includes:
- **Real-time validation**
- **Email delivery** to your Gmail
- **MongoDB backup** storage
- **Spam protection**
- **Success/error feedback**

## 🌙 Dark Mode

- **Automatic detection** of system preference
- **Manual toggle** button
- **Persistent** across sessions
- **Smooth transitions** between themes

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

## 📊 SEO & Analytics

- **Meta tags** optimization
- **Open Graph** support
- **Structured data** markup
- **Sitemap** generation
- **Google Analytics** ready

## 🔒 Security Features

- **Environment variables** for sensitive data
- **Input validation** and sanitization
- **Rate limiting** for contact form
- **CORS** configuration
- **Helmet.js** security headers

## 📈 Monitoring

- **Error logging** with Winston
- **Performance metrics** tracking
- **Uptime monitoring** ready
- **Health check** endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For questions or support:
- Email: dileepkomarthi@gmail.com
- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]

---

**Built with ❤️ by Komarthi Dileep Kumar**

