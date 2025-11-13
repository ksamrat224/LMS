# 📚 LMS - Library Management System

A modern, full-stack Library Management System for efficiently managing books, members, and transactions — built to simplify the library experience for both librarians and readers.

## 🛡️ Badges

[![License](https://img.shields.io/github/license/ksamrat224/LMS)](https://github.com/ksamrat224/LMS/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/ksamrat224/LMS?style=social)](https://github.com/ksamrat224/LMS/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/ksamrat224/LMS?style=social)](https://github.com/ksamrat224/LMS/network/members)
[![GitHub issues](https://img.shields.io/github/issues/ksamrat224/LMS)](https://github.com/ksamrat224/LMS/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/ksamrat224/LMS)](https://github.com/ksamrat224/LMS/pulls)
[![GitHub last commit](https://img.shields.io/github/last-commit/ksamrat224/LMS)](https://github.com/ksamrat224/LMS/commits/main)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)

---

## 🏛️ About

The **Library Management System (LMS)** is a complete web application that helps libraries manage books, members, staff, and transactions.  
It supports operations like book cataloging, borrowing/returning, fine calculation, and membership management — all through an intuitive interface.

Built using **TypeScript**, **React**, **Tailwind CSS**, and **NestJS**, this system delivers a scalable and responsive solution suitable for educational institutions, organizations, and public libraries.

Key highlights:
- 📖 Digital catalog of books and authors  
- 👥 Member and staff management  
- 🔄 Borrowing & returning workflow  
- 💰 Fine tracking & automated reminders  
- 📊 Dashboard analytics for admins  

---

## ✨ Features

- 📚 **Book Management** – Add, edit, delete, and search for books by title, author, or category.  
- 👤 **Member Management** – Register members, track borrowing history, and manage subscriptions.  
- 🔄 **Issue/Return System** – Streamlined process for lending and returning books.  
- ⏰ **Fine Calculation** – Automatic fine computation for overdue returns.  
- 📈 **Reports & Analytics** – Insights on popular books, late returns, and active members.  
- 🔐 **Authentication** – Secure login for admins, librarians, and members.  
- 📱 **Responsive UI** – Optimized for both desktop and mobile devices.  
- 🧩 **Scalable Architecture** – Easily extendable for new modules and integrations.  

---



## 🚀 Quick Start

Run the project in three simple steps:

```bash
git clone https://github.com/ksamrat224/LMS.git
cd LMS
npm install && npm run dev


Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Git
- PostgreSQL database

### Option 1: From Source

```bash
# Clone repository
git clone https://github.com/ksamrat224/LMS.git
cd LMS

# Install dependencies
npm install

# Build project
npm run build

# Start development server
npm run dev
```
# Clone repository
git clone https://github.com/ksamrat224/LMS.git
cd LMS

# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Start the project
npm run dev




## 💻 Usage

### Basic Usage

```typescript
// Example: Fetching courses from the API
import { getCourses } from './services/courseService';

async function displayCourses() {
  const courses = await getCourses();
  console.log(courses);
}

displayCourses();
```

### Advanced Examples

```typescript
// Example: Creating a new user
import { createUser } from './services/userService';

async function registerUser() {
  const newUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'securepassword'
  };

  const user = await createUser(newUser);
  console.log('New user created:', user);
}

registerUser();
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/lmsdb
DATABASE_SSL=false

# Server
PORT=3000
NODE_ENV=development

# JWT Secret
JWT_SECRET=your_jwt_secret_key
```

### Configuration File

```json
{
  "name": "lms-config",
  "version": "1.0.0",
  "settings": {
    "theme": "light",
    "language": "en",
    "notifications": true
  }
}
```

## API Reference

The LMS API provides endpoints for managing books, users, and other resources.





## 📁 Project Structure

```
LMS/
├── 📁 client/                 # React frontend
│   ├── 📁 src/
│   │   ├── 📁 components/      # Reusable UI components
│   │   ├── 📁 pages/          # Application pages
│   │   ├── 📁 services/       # API services
│   │   ├── 📁 styles/         # CSS/styling files
│   │   └── 📄 App.tsx         # Main application component
│   ├── 📄 package.json       # Frontend dependencies
│   └── 📄 README.md
├── 📁 server/                 # NestJS backend
│   ├── 📁 src/
│   │   ├── 📁 modules/        # Backend modules (courses, users, etc.)
│   │   ├── 📁 controllers/    # API controllers
│   │   ├── 📁 services/       # Business logic services
│   │   ├── 📁 entities/       # Database entities
│   │   └── 📄 main.ts         # Application entry point
│   ├── 📄 package.json       # Backend dependencies
│   └── 📄 README.md
├── 📁 docs/                   # Documentation
├── 📄 .env.example           # Environment variables template
├── 📄 .gitignore             # Git ignore rules
├── 📄 package.json           # Project dependencies
├── 📄 README.md              # Project documentation
└── 📄 LICENSE                # License file
```


```
