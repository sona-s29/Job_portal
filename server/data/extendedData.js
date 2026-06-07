export const courses = [
    {
        id: "react-interview-mastery",
        title: "React Interview Mastery",
        description: "Prepare for frontend interviews with practical React patterns and system design basics.",
        instructor: "Aarav Sharma",
        price: 1999,
        thumbnail: "https://source.unsplash.com/800x500/?online,learning",
        curriculum: ["React fundamentals", "Hooks", "State management", "Interview projects"],
        rating: 4.8,
    },
    {
        id: "node-api-builder",
        title: "Backend APIs with Node",
        description: "Build secure Express and MongoDB APIs for production applications.",
        instructor: "Neha Kapoor",
        price: 2499,
        thumbnail: "https://source.unsplash.com/800x500/?developer,server",
        curriculum: ["Express routing", "MongoDB schemas", "Auth", "Deployment"],
        rating: 4.7,
    },
];

export const companies = [
    {
        id: "novatech",
        name: "NovaTech",
        industry: "SaaS",
        size: "501-1000",
        jobCount: 42,
        description: "NovaTech builds workflow automation products for global teams.",
        benefits: ["Hybrid work", "Learning budget", "Health insurance"],
    },
    {
        id: "bluepeak",
        name: "BluePeak",
        industry: "FinTech",
        size: "201-500",
        jobCount: 28,
        description: "BluePeak helps businesses manage payments and treasury operations.",
        benefits: ["Stock options", "Wellness plan", "Remote roles"],
    },
];

export const plans = [
    { id: "free", name: "Free", price: 0, features: ["Job search", "Saved jobs", "Basic profile"] },
    { id: "pro", name: "Pro", price: 1499, features: ["Priority profile", "Advanced insights", "Resume tools"] },
    { id: "enterprise", name: "Enterprise", price: 14999, features: ["Hiring analytics", "Team seats", "Priority support"] },
];

export const salaryInsights = [
    { role: "Frontend Developer", location: "Bangalore", p25: 600000, p50: 1100000, p75: 1800000 },
    { role: "Backend Developer", location: "Hyderabad", p25: 700000, p50: 1300000, p75: 2100000 },
];

export const blogPosts = [
    {
        slug: "resume-that-gets-shortlisted",
        title: "Write a resume that gets shortlisted",
        content: "A practical resume balances clarity, measurable impact, and role-specific keywords.",
        author: "CareerHive Editorial",
        tags: ["resume", "job-search"],
        publishedAt: "2026-06-04",
    },
    {
        slug: "salary-negotiation-guide",
        title: "A practical salary negotiation guide",
        content: "Good negotiation starts with market context, timing, and a clear value story.",
        author: "CareerHive Editorial",
        tags: ["salary", "career"],
        publishedAt: "2026-06-04",
    },
];

export const faqs = [
    { category: "Job Seekers", question: "How do I save jobs?", answer: "Use the bookmark action on a job card." },
    { category: "Employers", question: "How do recruiters post jobs?", answer: "Recruiters can create a company and publish jobs from the admin dashboard." },
    { category: "Technical", question: "Can I update my resume?", answer: "Yes, update your resume from the profile page." },
];

export const notifications = [
    { id: "n1", type: "jobs", text: "New React roles match your saved search.", read: false, createdAt: new Date().toISOString() },
    { id: "n2", type: "applications", text: "Your application status changed to Under Review.", read: false, createdAt: new Date().toISOString() },
];

export const conversations = [
    { id: "c1", participant: "NovaTech Recruiter", lastMessage: "Thanks for applying. Are you available tomorrow?", unread: 1 },
];

export const messages = [
    { id: "m1", conversationId: "c1", sender: "recruiter", content: "Thanks for applying. Are you available tomorrow?", timestamp: new Date().toISOString(), read: false },
];
