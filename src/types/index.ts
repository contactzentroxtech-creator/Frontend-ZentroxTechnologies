// ─── User ─────────────────────────────────────────────────────────────────────
export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'student' | 'admin' | 'admin' | 'mentor';
  isActive: boolean;
  internshipStatus: 'none' | 'applied' | 'active' | 'completed';
  enrolledCourses: string[];
  certificates: string[];
  profileData?: {
    bio?: string;
    skills?: string[];
    github?: string;
    linkedin?: string;
    portfolio?: string;
    city?: string;
    state?: string;
    college?: string;
  };
  createdAt: string;
  lastLogin?: string;
}

// ─── Course ───────────────────────────────────────────────────────────────────
export interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDesc?: string;
  thumbnail?: string;
  previewVideo?: string;
  instructorName?: string;
  category: 'web-dev' | 'mobile' | 'ai-ml' | 'seo' | 'design' | 'devops' | 'fullstack';
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  discountPrice?: number;
  isFree: boolean;
  isFeatured: boolean;
  isLive: boolean;
  nextLiveDate?: string;
  liveSchedule?: string;
  totalDuration?: number;
  totalLessons: number;
  enrolledCount: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  outcomes: string[];
  requirements: string[];
  certificate: boolean;
  language: string;
  isPublished: boolean;
  modules?: CourseModule[];
  createdAt: string;
}

export interface CourseModule {
  _id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  _id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  duration?: number;
  order: number;
  isPreview: boolean;
  resources?: { name: string; url: string }[];
}

// ─── Enrollment ───────────────────────────────────────────────────────────────
export interface Enrollment {
  _id: string;
  user: string;
  course: Course;
  progress: number;
  completedLessons: string[];
  lastAccessedAt?: string;
  completedAt?: string;
  certificateIssued: boolean;
  createdAt: string;
}

// ─── Internship ───────────────────────────────────────────────────────────────
export interface Internship {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  domain: string;
  duration: string;
  type: 'remote' | 'hybrid';
  stipend: number;
  isPaid: boolean;
  requirements: string[];
  tasks: InternshipTask[];
  maxSlots: number;
  filledSlots: number;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  aptitudeTestRequired: boolean;
  minAptitudeScore: number;
  certificate: boolean;
  offerLetter: boolean;
  createdAt: string;
}

export interface InternshipTask {
  _id: string;
  title: string;
  description?: string;
  deadline?: string;
  order: number;
  isRequired: boolean;
}

// ─── Application ──────────────────────────────────────────────────────────────
export interface Application {
  _id: string;
  user: User | string;
  internship: Internship | string;
  status: 'pending' | 'test-pending' | 'test-passed' | 'test-failed' | 'accepted' | 'active' | 'completed' | 'rejected';
  aptitudeScore?: number;
  aptitudeAttempted: boolean;
  progress: number;
  mentorFeedback?: string;
  createdAt: string;
}

// ─── Certificate ──────────────────────────────────────────────────────────────
export interface Certificate {
  _id: string;
  certificateId: string;
  type: 'course' | 'internship' | 'offer-letter' | 'completion' | 'recommendation';
  recipientName: string;
  recipientEmail?: string;
  courseName?: string;
  internshipRole?: string;
  internshipDuration?: string;
  issuedBy: string;
  issuedAt: string;
  pdfUrl?: string;
  qrCodeUrl?: string;
  verifyUrl?: string;
  isValid: boolean;
}

// ─── Lead ─────────────────────────────────────────────────────────────────────
export interface Lead {
  _id: string;
  name: string;
  email?: string;
  phone: string;
  service?: string;
  budget?: string;
  message?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';
  priority: 'low' | 'medium' | 'high';
  notes: { text: string; addedBy: string; addedAt: string }[];
  city?: string;
  createdAt: string;
}

// ─── Blog ─────────────────────────────────────────────────────────────────────
export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  thumbnail?: string;
  authorName?: string;
  category?: string;
  tags: string[];
  isPublished: boolean;
  publishedAt?: string;
  viewCount: number;
  readTime?: number;
  featured: boolean;
  createdAt: string;
}

// ─── API Response ─────────────────────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  total?: number;
  page?: number;
  pages?: number;
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export interface DashboardStats {
  totalUsers: number;
  totalLeads: number;
  totalCourses: number;
  totalEnrollments: number;
  totalApplications: number;
  totalCertificates: number;
  totalBlogPosts: number;
  newLeadsToday: number;
}
