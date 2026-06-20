# Zentrox Technologies — Full Stack Platform

> **MSME Registered Technology Company — Mohali & Chandigarh**
>
> A production-grade, full-stack SaaS platform for Zentrox Technologies including the company website, LMS, internship system, certificate management, super admin panel, lead generation, and SEO infrastructure.

---

## Tech Stack

| Layer      | Technology                                               |
| ---------- | -------------------------------------------------------- |
| Frontend   | Next.js 15, TypeScript, Tailwind CSS, Framer Motion      |
| Backend    | Node.js, Express.js, MongoDB Atlas, Mongoose             |
| Auth       | JWT + Refresh Tokens, RBAC                               |
| Storage    | Cloudinary                                               |
| Payments   | Razorpay (primary), Stripe (international)               |
| Email      | Gmail SMTP (Nodemailer)                                  |
| Deployment | Frontend → Vercel, Backend → Railway, DB → MongoDB Atlas |

---

## Project Structure

```
zentrox/
├── frontend/                 # Next.js 15 application
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   │   ├── page.tsx     # Homepage
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   ├── contact/
│   │   │   ├── courses/
│   │   │   ├── blog/
│   │   │   ├── internship/
│   │   │   ├── dashboard/   # Student dashboard
│   │   │   ├── admin/       # Super admin panel
│   │   │   ├── auth/        # Login / Register
│   │   │   ├── verify/      # Certificate verification
│   │   │   ├── locations/   # SEO location pages
│   │   │   ├── privacy/
│   │   │   ├── terms/
│   │   │   ├── sitemap.ts   # Dynamic sitemap
│   │   │   └── robots.ts
│   │   ├── components/
│   │   │   ├── layout/      # Navbar, Footer
│   │   │   ├── hero/        # Hero section
│   │   │   ├── sections/    # Homepage sections
│   │   │   ├── admin/       # Admin components
│   │   │   ├── ui/          # Cursor, Popup, FloatingCTA
│   │   │   └── seo/         # Location page template
│   │   ├── lib/api.ts        # Axios client + interceptors
│   │   ├── store/           # Zustand stores
│   │   ├── hooks/
│   │   ├── types/
│   │   └── styles/globals.css
│   ├── .env.local.example
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── vercel.json
│
├── backend/                  # Express.js API
│   ├── src/
│   │   ├── server.js        # Entry point
│   │   ├── models/index.js  # All Mongoose models
│   │   ├── routes/          # All API routes
│   │   │   ├── auth.js      # Register, login, refresh, reset
│   │   │   ├── users.js     # Dashboard, profile
│   │   │   ├── leads.js     # CRM lead management
│   │   │   ├── courses.js   # LMS courses + enrollment
│   │   │   ├── internship.js # Applications + test
│   │   │   ├── certificates.js # Generation + verification
│   │   │   ├── blog.js      # Blog CRUD
│   │   │   ├── admin.js     # Admin dashboard stats
│   │   │   ├── cms.js       # Site settings + popups
│   │   │   ├── analytics.js # Performance analytics
│   │   │   ├── payments.js  # Razorpay integration
│   │   │   └── upload.js    # Cloudinary uploads
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js # JWT + RBAC
│   │   │   └── errorMiddleware.js
│   │   ├── services/
│   │   │   ├── email/emailService.js    # All email templates
│   │   │   ├── certificate/certificateService.js # PDF generation
│   │   │   └── storage/cloudinaryConfig.js
│   │   └── utils/
│   │       ├── logger.js    # Winston logger
│   │       └── tokenUtils.js # JWT helpers
│   └── .env.example
│
└── docs/
    ├── README.md
    └── DEPLOYMENT.md
```

---

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (free tier works)
- Cloudinary account (free tier works)
- Gmail account with App Password enabled

### 1. Clone and Install

```bash
# Frontend
cd frontend && npm install

# Backend
cd ../backend && npm install
```

### 2. Environment Variables

**Backend** — copy `.env.example` to `.env`:

```bash
cp backend/.env.example backend/.env
```

**Frontend** — copy `.env.local.example` to `.env.local`:

```bash
cp frontend/.env.local.example frontend/.env.local
```

See [Environment Variables](#environment-variables) section for all required keys.

### 3. Run Development

```bash
# Terminal 1 — Backend
cd backend && npm run dev
# Runs on https://backend-zentroxtechnologies.onrender.com/

# Terminal 2 — Frontend
cd frontend && npm run dev
# Runs on http://localhost:3000
```

### 4. Create Super Admin

After starting, create a user via `/auth/register`, then manually update their role in MongoDB:

```javascript
db.users.updateOne({ email: "your@email.com" }, { $set: { role: "admin" } });
```

Access admin panel at: `http://localhost:3000/admin`

---

## Environment Variables

### Backend (`backend/.env`)

```env
# Server
NODE_ENV=development
PORT=5000
ALLOWED_ORIGINS=http://localhost:3000,https://zentroxtech.com

# MongoDB Atlas
# Get from: https://cloud.mongodb.com → Connect → Drivers
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/

# JWT Secrets (generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
JWT_SECRET=<64-char-random-string>
JWT_EXPIRE=15m
JWT_REFRESH_SECRET=<different-64-char-random-string>
JWT_REFRESH_EXPIRE=30d

# Gmail SMTP
# 1. Enable 2-Factor Auth on Gmail
# 2. Go to: https://myaccount.google.com/apppasswords
# 3. Generate App Password for "Mail"
GMAIL_USER=contact.zentroxtech@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx

# Cloudinary
# Get from: https://console.cloudinary.com/console
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay
# Get from: https://dashboard.razorpay.com/app/keys
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret

# Stripe (optional - for international payments)
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxx

# Frontend URL (for email links)
FRONTEND_URL=http://localhost:3000
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
NEXT_PUBLIC_WHATSAPP_NUMBER=918988183513
NEXT_PUBLIC_GOOGLE_VERIFICATION=your_verification_code
```

---

## API Routes Reference

| Method | Route                              | Auth   | Description          |
| ------ | ---------------------------------- | ------ | -------------------- |
| POST   | `/api/auth/register`               | Public | Create account       |
| POST   | `/api/auth/login`                  | Public | Login                |
| POST   | `/api/auth/refresh`                | Cookie | Refresh access token |
| POST   | `/api/auth/logout`                 | Auth   | Logout               |
| POST   | `/api/auth/forgot-password`        | Public | Send reset email     |
| POST   | `/api/auth/reset-password`         | Public | Reset with token     |
| GET    | `/api/auth/me`                     | Auth   | Current user         |
| GET    | `/api/users/dashboard`             | Auth   | Student dashboard    |
| PATCH  | `/api/users/profile`               | Auth   | Update profile       |
| POST   | `/api/leads`                       | Public | Submit contact form  |
| GET    | `/api/leads`                       | Admin  | All leads            |
| PATCH  | `/api/leads/:id`                   | Admin  | Update lead          |
| GET    | `/api/courses`                     | Public | List courses         |
| GET    | `/api/courses/:slug`               | Public | Course detail        |
| POST   | `/api/courses`                     | Admin  | Create course        |
| POST   | `/api/courses/:id/enroll`          | Auth   | Enroll in course     |
| PATCH  | `/api/courses/:id/progress`        | Auth   | Update progress      |
| GET    | `/api/internship`                  | Public | List internships     |
| POST   | `/api/internship/:id/apply`        | Auth   | Apply                |
| GET    | `/api/internship/:id/test`         | Auth   | Get aptitude test    |
| POST   | `/api/internship/:id/test/submit`  | Auth   | Submit test          |
| GET    | `/api/certificates/verify/:certId` | Public | Verify certificate   |
| GET    | `/api/certificates/my`             | Auth   | My certificates      |
| GET    | `/api/blog`                        | Public | List blog posts      |
| POST   | `/api/payments/razorpay/order`     | Auth   | Create payment order |
| POST   | `/api/payments/razorpay/verify`    | Auth   | Verify payment       |
| GET    | `/api/admin/dashboard`             | Admin  | Dashboard stats      |
| GET    | `/api/cms/settings`                | Public | Site settings        |
| PATCH  | `/api/cms/settings`                | Admin  | Update settings      |
| GET    | `/api/cms/popups/active`           | Public | Active popups        |
| POST   | `/api/upload/image`                | Admin  | Upload image         |
| GET    | `/api/analytics/overview`          | Admin  | Analytics data       |

---

## Admin Panel Sections

Access at `/admin` (requires admin or admin role)

| Section      | Route                 | Description                              |
| ------------ | --------------------- | ---------------------------------------- |
| Dashboard    | `/admin`              | Stats, recent leads, charts              |
| Leads CRM    | `/admin/leads`        | Full lead management + notes             |
| Users        | `/admin/users`        | User management + roles                  |
| Courses      | `/admin/courses`      | Create/edit/publish courses              |
| Blog         | `/admin/blog`         | Blog post management                     |
| Internship   | `/admin/internship`   | Applications + status management         |
| Certificates | `/admin/certificates` | View all issued certificates             |
| Analytics    | `/admin/analytics`    | Charts: leads, enrollments, applications |
| CMS          | `/admin/cms`          | Edit site content without code           |
| Popups       | `/admin/popups`       | Manage popup campaigns                   |
| Media        | `/admin/media`        | Upload images to Cloudinary              |
| Settings     | `/admin/settings`     | Platform configuration                   |

---

## Features Implemented

### Public Website

- Cinematic hero section with floating 3D cards + animated assistant character
- Services section with 8 service categories
- Interactive pricing wizard (multi-step quote builder)
- Saturday live classes section with real countdown timer
- Testimonials grid
- Local SEO sections (Mohali, Chandigarh, Punjab)
- Contact form with lead capture
- WhatsApp floating button
- Custom cursor effect
- Popup campaign system
- Multilingual UI (EN / HI / PA)

### Authentication

- Email + password registration/login
- JWT access tokens (15min) + refresh tokens (30 days)
- HTTP-only cookie refresh token
- Password reset via email
- RBAC: student, mentor, admin, admin

### LMS System

- Course catalog with filters
- Course enrollment (free + paid via Razorpay)
- Lesson progress tracking
- Certificate issuance on completion

### Internship System

- Internship listings
- Application flow
- Aptitude test system
- Admin review + status management
- Automated offer letter emails
- Completion certificate generation

### Certificate System

- Dynamic PDF generation (PDFKit)
- QR code verification
- Unique certificate IDs (ZT-XXXXX-XXXXX)
- Public verification page at `/verify/[certId]`
- Cloudinary PDF storage

### Admin Panel

- Full CRUD for all content
- Lead CRM with notes and status tracking
- Analytics charts (Recharts)
- CMS site settings editor
- Popup campaign manager
- Media manager (Cloudinary uploads)
- Role management

### SEO

- Dynamic metadata for all pages
- sitemap.xml (auto-generated)
- robots.txt
- OpenGraph + Twitter cards
- JSON-LD Schema (Organization, LocalBusiness, FAQPage)
- 5 targeted location pages (Mohali, Chandigarh, HP, Haryana, Noida)
- Semantic HTML throughout

---

## Accounts Required

| Service               | Purpose                | URL                                       |
| --------------------- | ---------------------- | ----------------------------------------- |
| MongoDB Atlas         | Database               | https://cloud.mongodb.com                 |
| Cloudinary            | Image/file storage     | https://cloudinary.com                    |
| Razorpay              | INR payments           | https://razorpay.com                      |
| Stripe                | International payments | https://stripe.com                        |
| Gmail                 | Email (SMTP)           | https://myaccount.google.com/apppasswords |
| Vercel                | Frontend hosting       | https://vercel.com                        |
| Railway               | Backend hosting        | https://railway.app                       |
| Google Search Console | SEO verification       | https://search.google.com/search-console  |

---

## Branding

**Company Name:** Zentrox Technologies _(always use full name)_

**Do NOT use:** Zentrox AI, Zentrox.ai, Zentrox Tech, or any shortened variation.

**Contact:**

- Email: contact.zentroxtech@gmail.com
- Phone: +91 89881 83513
- Location: Mohali & Chandigarh, Punjab, India
- Registration: MSME Registered

---

## License

All rights reserved. © 2025 Zentrox Technologies. MSME Registered — India.

Unauthorized reproduction, distribution, or commercial use of any part of this codebase is prohibited.
