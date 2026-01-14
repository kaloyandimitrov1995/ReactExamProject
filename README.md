# 📰 Freelance News Board

**Freelance News Board** is a community-driven **React Single Page Application (SPA)** where freelancers can:

- Share topics (news, job offers, stories)
- Discover trending content
- Interact through likes and comments

The project demonstrates **real-world frontend architecture** using React, React Router, Context API, form validation, protected routes, and REST-style communication with the **SoftUni Practice Server** backend.

---

## 📋 Table of Contents

| Section | Description |
|-------|-------------|
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

---

## 👥 User Roles

| Role | Description | Access Level |
|----|------------|--------------|
| **GUEST** | Unauthenticated users | Login, Register, FAQ, Contact |
| **USER** | Registered users | Full access to topics, profiles, likes, comments |

---

## 🗺️ Application Routes

### 🌐 Public Routes
- `/login`
- `/register`
- `/contact`
- `/faq`

### 🔒 Private Routes
- `/`
- `/topics/create`
- `/topics/:topicId`
- `/topics/search`
- `/profile/edit`
- `/users/:userId`

### 🚫 Fallback
- `*` – Not Found page

---

## 🏗️ Application Architecture

### 📄 Pages
Home · Login · Register · TopicCreate · TopicDetails · TopicSearch · UserProfile · UserEdit · FAQ · Contact · NotFound

### 🌍 Global State (Context API)
- AuthContext  
- ProfileContext  
- TopicsContext  
- LikeContext  
- TopicUpdateContext  

### 🔌 Services Layer
topicService · commentService · likeService · profileService

---

## 🛠️ Technology Stack

### Frontend
- React
- React Router DOM
- Context API
- Fetch API
- CSS

### Backend
- SoftUni Practice Server

---

## 🔌 REST Endpoints

### Topics
GET /data/topics  
GET /data/topics/:id  
POST /data/topics  
PUT /data/topics/:id  
DELETE /data/topics/:id  

### Comments
GET /data/comments  
POST /data/comments  

### Likes
GET /data/likes  
POST /data/likes  
DELETE /data/likes/:id  

---

## 📊 Data Model

Topic · Comment · Like · Profile

---

## ⚡ How to Run

Node v22.21.1 (Windows 11)

npm install  
npm run dev  

---

## 🔒 Security

Token-based authentication  
Protected routes  
Authorization headers  

---

## ⚠️ Known Limitations

- loadTopics outside useEffect
- Simple bad words filter

---

## 🎯 Purpose

Portfolio-level React SPA demonstrating real-world patterns.

---

## 👤 Author

Kaloyan Dimitrov  
https://github.com/LuckyKaloyan  
https://www.linkedin.com/in/kaloyan-dimitrov-79a399203/
