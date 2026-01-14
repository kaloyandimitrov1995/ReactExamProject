# 📰 Freelance News Board

**Freelance News Board** is a community-driven **React Single Page Application (SPA)** where freelancers can:

- Share topics (news, job offers, stories)
- Discover trending content
- Interact through likes and comments

The project demonstrates **real-world frontend architecture** using React, React Router, Context API, form validation, protected routes, and REST-style communication with the **SoftUni Practice Server** backend.

---

## 📋 Table of Contents

| Section | Description |
|---------|-------------|
| [🚀 Overview](#-overview) | Project goals and high-level description |
| [✨ Features](#-features) | User capabilities and functionality |
| [👥 User Roles](#-user-roles) | Role-based access control |
| [🗺️ Application Routes](#️-application-routes) | Route definitions and protection |
| [🏗️ Application Architecture](#️-application-architecture) | Component and state structure |
| [🛠️ Technology Stack](#️-technology-stack) | Tools and libraries used |
| [🔌 REST Endpoints](#-rest-endpoints) | API communication endpoints |
| [📊 Data Model](#-data-model) | Data structure definitions |
| [✅ Validation & Moderation](#-validation--moderation) | Input validation rules |
| [⚡ How to Run](#-how-to-run) | Setup and execution instructions |
| [🔒 Security](#-security) | Security measures implemented |
| [⚠️ Known Limitations](#️-known-limitations--improvements) | Current limitations and future plans |
| [🎯 Purpose](#-purpose-of-the-project) | Project objectives |
| [👤 Author](#-author) | Contact information |

---

## 🚀 Overview

The goal of **Freelance News Board** is to combine:

- Community-driven discussions
- Freelancer visibility and engagement
- Topic categorization and discovery
- Profile-based identity

This is a **client-side SPA** built entirely with **React**, while authentication and data persistence are handled via a REST-style backend.

[↑ Back to Top](#-freelance-news-board)

---

## ✨ Features

### 👤 User Features

- User registration & login
- **Public pages**
  - FAQ
  - Contact
- **Authenticated user area**
  - Home feed with latest topics
  - Create topics (**News / Job Offer / Story**)
  - View topic details
  - Like / Unlike topics
  - Comment on topics
  - Search topics by title, author, or content
  - User profile page
  - Edit user profile (avatar + personal info)

### 🔍 Content Discovery

- Category filters on the Home page
- Full-text search across all topics

[↑ Back to Top](#-freelance-news-board)

---

## 👥 User Roles

| Role | Description | Access Level |
|------|-------------|--------------|
| **GUEST** | Unauthenticated users | Login, Register, FAQ, Contact |
| **USER** | Registered users | Full access to topics, profiles, likes, comments |

### 🔐 Route Protection

- `PrivateRoute` - Guards authenticated-only routes
- `GuestRoute` - Redirects authenticated users away from login/register

[↑ Back to Top](#-freelance-news-board)

---

## 🗺️ Application Routes

### 🌐 Public Routes
- `/login` - User authentication
- `/register` - User registration
- `/contact` - Contact information
- `/faq` - Frequently asked questions

### 🔒 Private Routes (Authenticated)
- `/` – Home (Latest Topics)
- `/topics/create` – Create new topic
- `/topics/:topicId` – Topic details with comments
- `/topics/search` – Search functionality
- `/profile/edit` – Edit user profile
- `/users/:userId` – User profile view

### 🚫 Fallback
- `*` – Not Found page (404)

[↑ Back to Top](#-freelance-news-board)

---

## 🏗️ Application Architecture

### 📄 Pages
- **Home** - Topic feed with filtering
- **Login / Register** - Authentication forms
- **TopicCreate** - New topic creation
- **TopicDetails** - Single topic view with interactions
- **TopicSearch** - Search interface
- **UserProfile** - Profile viewing
- **UserEdit** - Profile editing
- **FAQ** - Help information
- **Contact** - Contact details
- **NotFound** - 404 page

### 🌍 Global State (Context API)
- `AuthContext` – Authentication state and token management
- `ProfileContext` – User profile data and updates
- `TopicsContext` – Topic loading, filtering, and searching
- `LikeContext` – Like/unlike state management
- `TopicUpdateContext` – Topic refresh notifications

### 🔌 Services Layer
All HTTP requests are centralized in `utils/api.js` and separated into:
- `topicService.js` - Topic CRUD operations
- `commentService.js` - Comment management
- `likeService.js` - Like/unlike functionality
- `profileService.js` - Profile operations

[↑ Back to Top](#-freelance-news-board)

---

## 🛠️ Technology Stack

### 🎨 Frontend
- **React** - UI library
- **React Router DOM** - Routing
- **Context API** - State management
- **Custom hooks** (`useForm`) - Form handling
- **Fetch API** - HTTP requests
- **CSS** - Styling (global + component-scoped)

### 🗄️ Backend
- **SoftUni Practice Server** - REST API backend

[↑ Back to Top](#-freelance-news-board)

---

## 🔌 REST Endpoints

### 📰 Topics
```http
GET /data/topics
GET /data/topics/:id
POST /data/topics
PUT /data/topics/:id
DELETE /data/topics/:id
```
### 💬 Comments
```http
GET /data/comments?where=topicId="{topicId}"
POST /data/comments
```
### ❤️ Likes
```http
GET /data/likes?where=topicId="{topicId}"
GET /data/likes?where=topicId="{topicId}" AND _ownerId="{userId}"
POST /data/likes
DELETE /data/likes/:id
```
### 👤 Profiles
```http
GET /data/profiles?where=_ownerId="{userId}"
POST /data/profiles
PUT /data/profiles/:id
```
### 🔑 Authentication

X-Authorization: {accessToken}


[↑ Back to Top](#-freelance-news-board)

---

## 📊 Data Model

### 📰 Topic
```json
{
  "_id": "string",
  "_ownerId": "string",
  "title": "string",
  "content": "string",
  "category": "news | job | story",
  "authorName": "string",
  "createdAt": "ISO date"
}
```
### 💬 Comment
```json
{
  "_id": "string",
  "topicId": "string",
  "text": "string",
  "authorName": "string"
}
```
### ❤️ Like
```json
{
  "_id": "string",
  "topicId": "string",
  "_ownerId": "string"
}
```
### 👤 Profile
```json
{
  "_id": "string",
  "_ownerId": "string",
  "email": "string",
  "displayName": "string",
  "firstName": "string",
  "lastName": "string",
  "job": "string",
  "age": "number",
  "nationality": "string",
  "bio": "string",
  "avatarUrl": "string"
}
```
[↑ Back to Top](#-freelance-news-board)

## ✅ Validation & Moderation

📰 Topics
  - Title: 4–40 characters
  - Content: 11–400 characters
  - Category: Required (news/job/story)
  - Bad words filter: Simple substring-based moderation


🔐 Registration
  - Email: Valid format required
  - Username: 3-20 characters, unique
  - Forbidden usernames: Blocked list
  - Password: Confirmation matching


👤 Profile
  - Required fields: First name, last name, email
  - Age: 1–120 range
  - Avatar: Must be valid image URL

[↑ Back to Top](#-freelance-news-board)

## ⚡ How to Run
Environment:
Node v22.21.1 on Windows 11

### ▶️ Start the Client
```bash
cd path/to/project
cd client
npm install
npm install react-router-dom
npm run dev
```
### 🧪 Run Client Tests
```bash
cd path/to/project
cd client
npm install --save-dev jest @testing-library/react @testing-library/jest-dom babel-jest @babel/preset-env @babel/preset-react
npm test
```

### 🗄️ Start the SoftUni Practice Server
```bash
cd path/to/project
cd server
npm install
npm start
```
🔑 Test Accounts
Email	Password
  - peter@abv.bg	123456
  - george@abv.bg	123456
  - admin@abv.bg	admin

🔗 Backend Repository
https://github.com/softuni-practice-server/softuni-practice-server

[↑ Back to Top](#-freelance-news-board)

## 🔒 Security
  - Token-based authentication
  - Protected routes via route guards
  - Authorization header injection
  - Client-side access control

[↑ Back to Top](#-freelance-news-board)

## ⚠️ Known Limitations & Improvements
  - loadTopics() is called outside useEffect in some components
  - Profile topic loading could be optimized via backend queries
  - Bad words filter is simplistic and substring-based
  - Mobile responsiveness could be enhanced

[↑ Back to Top](#-freelance-news-board)

## 🎯 Purpose of the Project
  - This project demonstrates:
  - SPA routing and global state management
  - REST communication and authentication
  - Component-driven UI architecture
  - Realistic frontend validation
  - Portfolio-level React application structure

[↑ Back to Top](#-freelance-news-board)
## 👤 Author
Kaloyan Dimitrov
  - GitHub: https://github.com/LuckyKaloyan
  - LinkedIn: https://www.linkedin.com/in/kaloyan-dimitrov-79a399203/

[↑ Back to Top](#-freelance-news-board)
