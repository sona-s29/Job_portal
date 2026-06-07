import express from "express";
import {
    blogPosts,
    companies,
    conversations,
    courses,
    faqs,
    messages,
    notifications,
    plans,
    salaryInsights,
} from "../data/extendedData.js";

const router = express.Router();

const ok = (res, data, message = "Success", pagination) => {
    return res.json({ success: true, data, message, ...(pagination ? { pagination } : {}) });
};

const paginate = (items, page = 1, limit = 10) => {
    const currentPage = Math.max(Number(page) || 1, 1);
    const pageSize = Math.max(Number(limit) || 10, 1);
    const start = (currentPage - 1) * pageSize;
    return {
        data: items.slice(start, start + pageSize),
        pagination: {
            page: currentPage,
            limit: pageSize,
            total: items.length,
            pages: Math.ceil(items.length / pageSize),
        },
    };
};

router.get("/courses", (req, res) => {
    const { page, limit, category, level } = req.query;
    const filtered = courses.filter((course) => {
        const haystack = `${course.title} ${course.description}`.toLowerCase();
        return (!category || haystack.includes(String(category).toLowerCase())) &&
            (!level || haystack.includes(String(level).toLowerCase()));
    });
    const result = paginate(filtered, page, limit);
    return ok(res, result.data, "Courses fetched", result.pagination);
});

router.get("/courses/:id", (req, res) => {
    const course = courses.find((item) => item.id === req.params.id);
    if (!course) return res.status(404).json({ success: false, data: null, message: "Course not found" });
    return ok(res, course, "Course fetched");
});

router.get("/companies", (req, res) => {
    const { search, industry, page, limit } = req.query;
    const filtered = companies.filter((company) => {
        const matchesSearch = !search || company.name.toLowerCase().includes(String(search).toLowerCase());
        const matchesIndustry = !industry || company.industry.toLowerCase() === String(industry).toLowerCase();
        return matchesSearch && matchesIndustry;
    });
    const result = paginate(filtered, page, limit);
    return ok(res, result.data, "Companies fetched", result.pagination);
});

router.get("/companies/:id", (req, res) => {
    const company = companies.find((item) => item.id === req.params.id);
    if (!company) return res.status(404).json({ success: false, data: null, message: "Company not found" });
    return ok(res, { ...company, openPositions: [] }, "Company profile fetched");
});

router.get("/subscription/plans", (_, res) => ok(res, plans, "Subscription plans fetched"));

router.post("/subscription/subscribe", (req, res) => {
    return ok(res, { subscriptionId: `sub_${Date.now()}`, ...req.body, status: "placeholder" }, "Subscription placeholder created");
});

router.get("/salary-insights", (req, res) => {
    const { role, location } = req.query;
    const filtered = salaryInsights.filter((item) => {
        return (!role || item.role.toLowerCase().includes(String(role).toLowerCase())) &&
            (!location || item.location.toLowerCase().includes(String(location).toLowerCase()));
    });
    return ok(res, filtered, "Salary insights fetched");
});

router.post("/partnership/apply", (req, res) => ok(res, { id: `partner_${Date.now()}`, ...req.body }, "Partnership application received"));

router.get("/blog", (req, res) => {
    const result = paginate(blogPosts, req.query.page, req.query.limit);
    return ok(res, result.data, "Blog posts fetched", result.pagination);
});

router.get("/blog/:slug", (req, res) => {
    const post = blogPosts.find((item) => item.slug === req.params.slug);
    if (!post) return res.status(404).json({ success: false, data: null, message: "Blog post not found" });
    return ok(res, post, "Blog post fetched");
});

router.post("/resume/save", (req, res) => ok(res, { id: `resume_${Date.now()}`, ...req.body }, "Resume data saved"));

router.get("/notifications", (req, res) => {
    const result = paginate(notifications, req.query.page, req.query.limit);
    return ok(res, result.data, "Notifications fetched", result.pagination);
});

router.patch("/notifications/read-all", (_, res) => ok(res, { updated: notifications.length }, "All notifications marked read"));

router.get("/messages/conversations", (_, res) => ok(res, conversations, "Conversations fetched"));

router.get("/messages/:conversationId", (req, res) => {
    return ok(res, messages.filter((message) => message.conversationId === req.params.conversationId), "Messages fetched");
});

router.post("/messages/send", (req, res) => ok(res, { id: `m_${Date.now()}`, ...req.body }, "Message sent"));

router.get("/faq", (_, res) => ok(res, faqs, "FAQs fetched"));

router.post("/contact", (req, res) => ok(res, { id: `contact_${Date.now()}`, ...req.body }, "Contact request received"));

export default router;
