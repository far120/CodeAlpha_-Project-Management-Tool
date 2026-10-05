import rateLimit from 'express-rate-limit';

// 1. Limiter عام لكل الـ APIs (مثلاً: 100 طلب كل 15 دقيقة)
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  limit: 100, // الحد الأقصى لكل IP
  standardHeaders: 'draft-7', // إرجاع معلومات الـ Limit في الـ Headers
  legacyHeaders: false,
  message: {
    status: 'fail',
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
});

// 2. Limiter مشدد للـ Auth (مثل Login / Register - 10 محاولات كل 15 دقيقة)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: {
    status: 'fail',
    message: 'Too many login attempts, please try again after 15 minutes.',
  },
});
