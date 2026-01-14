# Freelance News Board

Freelance News Board is a community-driven React Single Page Application (SPA) where freelancers can share topics (news, job offers, stories), discover trending content, and interact through likes and comments.

The project demonstrates real-world frontend architecture using React, React Router, Context API, form validation, protected routes, and REST-style communication with the SoftUni Practice Server backend.

### 📋 Table of Contents

| Section | Description |
|---------|-------------|
| [🚀 Overview](#overview) | Project goals and high-level description |
| [✨ Features](#features) | User capabilities and functionality |
| [👥 User Roles](#user-roles) | Role-based access control |
| [🗺️ Application Routes](#application-routes) | Route definitions and protection |
| [🏗️ Application Architecture](#application-architecture) | Component and state structure |
| [🛠️ Technology Stack](#technology-stack) | Tools and libraries used |
| [🔌 REST Endpoints](#rest-endpoints) | API communication endpoints |
| [📊 Data Model](#data-model) | Data structure definitions |
| [✅ Validation & Moderation](#validation--moderation) | Input validation rules |
| [⚡ How to Run](#how-to-run) | Setup and execution instructions |
| [🔒 Security](#security) | Security measures implemented |
| [⚠️ Known Limitations](#known-limitations--improvements) | Current limitations and future plans |
| [🎯 Purpose](#purpose-of-the-project) | Project objectives |
| [👤 Author](#author) | Contact information |

</div>

---

<a name="overview"></a>
## 🚀 Overview

The goal of Freelance News Board is to combine:

- Community-driven discussions
- Freelancer visibility and engagement
- Topic categorization and discovery
- Profile-based identity

This is a Single Page Application (SPA) built entirely on the client side using React, with authentication and data persistence handled by a REST-style backend.

 [↑ Back to Top](#-table-of-contents)

---

<a name="features"></a>
## ✨ Features

### User Features
- User registration and login
- **Public pages:**
  - FAQ
  - Contact
- **Authenticated user area:**
  - Home feed with latest topics
  - Create topics (News / Job Offer / Story)
  - View topic details
  - Like / Unlike topics
  - Comment on topics
  - Search topics by title, author, or content
  - User profile page
  - Edit user profile (avatar + personal info)

### Content Discovery
- Category filters on Home page
- Search functionality across all topics

 [↑ Back to Top](#-table-of-contents)

---

<a name="user-roles"></a>
## 👥 User Roles

| Role | Description | Access Level |
|------|-------------|--------------|
| **GUEST** | Unauthenticated users | Can access login, register, FAQ, and contact pages |
| **USER** | Registered users | Full access to topics, profiles, likes, comments |

**Route protection is handled via:**
- `PrivateRoute`
- `GuestRoute`

 [↑ Back to Top](#-table-of-contents)

---

<a name="application-routes"></a>
## 🗺️ Application Routes

### Public Routes
- `/login`
- `/register`
- `/contact`
- `/faq`

### Private Routes (Authenticated)
- `/` – Home (Latest Topics)
- `/topics/create`
- `/topics/:topicId`
- `/topics/search`
- `/profile/edit`
- `/users/:userId`

### Fallback
- `*` – Not Found page

 [↑ Back to Top](#-table-of-contents)

---

<a name="application-architecture"></a>
## 🏗️ Application Architecture

### Pages
- Home
- Login / Register
- TopicCreate
- TopicDetails
- TopicSearch
- UserProfile
- UserEdit
- FAQ
- Contact
- NotFound

### Global State (Context API)
- `AuthContext` – authentication state
- `ProfileContext` – user profile data
- `TopicsContext` – topics loading & searching
- `LikeContext` – like updates
- `TopicUpdateContext` – topic refresh notifications

### Services Layer
All HTTP requests are centralized via `utils/api.js` and split into:
- `topicService.js`
- `commentService.js`
- `likeService.js`
- `profileService.js`

 [↑ Back to Top](#-table-of-contents)

---

<a name="technology-stack"></a>
## 🛠️ Technology Stack

### Frontend
- React
- React Router DOM
- Context API
- Custom hooks (useForm)
- Fetch API
- CSS (global + component-scoped)

### Backend
- SoftUni Practice Server

 [↑ Back to Top](#-table-of-contents)

---

<a name="rest-endpoints"></a>
## 🔌 REST Endpoints

### Topics
- `GET /data/topics`
- `GET /data/topics/:id`
- `POST /data/topics`
- `PUT /data/topics/:id`
- `DELETE /data/topics/:id`

### Comments
- `GET /data/comments?where=topicId="{topicId}"`
- `POST /data/comments`

### Likes
- `GET /data/likes?where=topicId="{topicId}"`
- `GET /data/likes?where=topicId="{topicId}" AND _ownerId="{userId}"`
- `POST /data/likes`
- `DELETE /data/likes/:id`

### Profiles
- `GET /data/profiles?where=_ownerId="{userId}"`
- `POST /data/profiles`
- `PUT /data/profiles/:id`

### Authentication
- `X-Authorization: {accessToken}`

 [↑ Back to Top](#-table-of-contents)

---

<a name="data-model"></a>
## 📊 Data Model

### Topic
json
{
  "_id": "string",
  "_ownerId": "string",
  "title": "string",
  "content": "string",
  "category": "news | job | story",
  "authorName": "string",
  "createdAt": "ISO date"
}
Comment
json
{
  "_id": "string",
  "topicId": "string",
  "text": "string",
  "authorName": "string"
}
Like
json
{
  "_id": "string",
  "topicId": "string",
  "_ownerId": "string"
}
Profile
json
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
 [↑ Back to Top](#-table-of-contents)
<a name="validation--moderation"></a>

✅ Validation & Moderation
Topics
Title: 4–40 characters

Content: 11–400 characters

Category: required

Bad words filter (simple substring-based)

Registration
Email format validation

Username length & uniqueness

Forbidden usernames

Password confirmation

Profile
Required personal fields

Age range: 1–120

Avatar must be a valid image URL

 [↑ Back to Top](#-table-of-contents)
<a name="how-to-run"></a>

⚡ How to Run
Works with Node v22.21.1 on Windows 11.

Start the Client
bash
cd path/to/project
cd client
npm install
npm install react-router-dom
npm run dev
Run Client Tests
bash
cd path/to/project
cd client
npm install --save-dev jest @testing-library/react @testing-library/jest-dom babel-jest @babel/preset-env @babel/preset-react
npm test
Start the SoftUni Practice Server
bash
cd path/to/project
cd server
npm install
npm start
Test Accounts
Email	Password
peter@abv.bg	123456
george@abv.bg	123456
admin@abv.bg	admin
Backend repository:
https://github.com/softuni-practice-server/softuni-practice-server

 [↑ Back to Top](#-table-of-contents)
<a name="security"></a>

🔒 Security
Token-based authentication

Protected routes via route guards

Authorization header injection

Client-side access control

 [↑ Back to Top](#-table-of-contents)
<a name="known-limitations--improvements"></a>

⚠️ Known Limitations & Improvements
loadTopics() is called outside useEffect in some components

Profile topic loading could be optimized via backend queries

Bad words filter is simplistic and substring-based

 [↑ Back to Top](#-table-of-contents)
<a name="purpose-of-the-project"></a>

🎯 Purpose of the Project
This project demonstrates:

SPA routing and global state management

REST communication and authentication

Component-driven UI architecture

Realistic frontend validation

Portfolio-level React application structure

 [↑ Back to Top](#-table-of-contents)
<a name="author"></a>

👤 Author
Kaloyan Dimitrov

[https://img.shields.io/badge/GitHub-Profile-blue?style=flat&logo=github](https://github.com/LuckyKaloyan)
[https://img.shields.io/badge/LinkedIn-Profile-blue?style=flat&logo=linkedin](https://www.linkedin.com/in/kaloyan-dimitrov-79a399203/)

 [↑ Back to Top](#-table-of-contents)
