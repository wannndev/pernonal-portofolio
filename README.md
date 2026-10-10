# WannDev Portfolio 🚀

> Modern Creative Portfolio & Full-Stack Showcase built with Next.js 15, Tailwind CSS, Laravel 11, and MySQL.

---

## 🌟 Overview

WannDev Portfolio is a full-stack personal portfolio and showcase platform featuring:
- **Interactive UI/UX**: Dynamic animations, light/dark mode, and responsive layout.
- **Bilingual Support**: Full Indonesian (default) and English localization switcher.
- **Deep Project Case Studies**: Dedicated project detail pages with challenges, approaches, and live demo links.
- **Admin CMS Dashboard**: Built-in content management powered by a robust Laravel 11 REST API.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router, Turbopack)
- **Styling**: Tailwind CSS & Lucide React
- **Language**: TypeScript

### Backend
- **Framework**: Laravel 11
- **Database**: MySQL
- **API**: RESTful API with token authentication (Sanctum)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- PHP (v8.2+)
- Composer
- MySQL

### 2. Backend Setup
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
# Configure database in .env
php artisan migrate --seed
php artisan serve
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📄 License
This project is proprietary and built by **WannDev** (Ridwan Prakoso).
