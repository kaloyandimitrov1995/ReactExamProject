# Freelance News Board

**Freelance News Board** is a community-driven **React Single Page Application (SPA)** where freelancers can share topics (news, job offers, stories), discover trending content, and interact through likes and comments.

The project demonstrates **real-world frontend architecture** using **React**, **React Router**, **Context API**, form validation, protected routes, and REST-style communication with the **SoftUni Practice Server** backend.

---

## 📌 Quick Navigation

- [Overview](#overview)
- [Features](#features)
- [User Roles](#user-roles)
- [Application Routes](#application-routes-frontend)
- [Application Architecture](#application-architecture)
- [Technology Stack](#technology-stack)
- [REST Endpoints](#rest-endpoints-backend)
- [Data Model](#data-model)
- [Validation & Moderation](#validation--moderation)
- [How to Run](#how-to-run-local-development)
- [Security](#security)
- [Known Limitations & Improvements](#known-limitations--improvements)
- [Purpose of the Project](#purpose-of-the-project)
- [Author](#author)

---

## Overview

The goal of **Freelance News Board** is to combine:

- Community-driven discussions
- Freelancer visibility and engagement
- Topic categorization and discovery
- Profile-based identity

This is a **Single Page Application (SPA)** built entirely on the client side using React, with authentication and data persistence handled by a REST-style backend.

---

## Features

### User Features
- User registration and login
- Public pages:
  - FAQ
  - Contact
- Authenticated user area:
  - Home feed with latest topics
  - Create topics (**News / Job Offer / Story**)
  - View topic details
  - Like / Unlike topics
  - Comment on topics
  - Search topics by title, author, or content
  - User profile page
  - Edit user profile (avatar + personal info)

### Content Discovery
- Category filters on Home page
- Search functionality across all topics

---

## User Roles

| Role  | Description |
|------|------------|
| GUEST | Can access login, register, FAQ, and contact pages |
| USER  | Full access to topics, profiles, likes, comments |

Route protection is handled via:
- `PrivateRoute`
- `GuestRoute`

---

## Application Routes (Frontend)

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

---

## Application Architecture

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
- **AuthContext** – authentication state
- **ProfileContext** – user profile data
- **TopicsContext** – topics loading & searching
- **LikeContext** – like updates
- **TopicUpdateContext** – topic refresh notifications

### Services Layer
All HTTP requests are centralized via `utils/api.js` and split into:
- `topicService.js`
- `commentService.js`
- `likeService.js`
- `profileService.js`

---

## Technology Stack

### Frontend
- React
- React Router DOM
- Context API
- Custom hooks (`useForm`)
- Fetch API
- CSS (global + component-scoped)

### Backend
- SoftUni Practice Server

---

## REST Endpoints (Backend)

### Topics
```http
GET    /data/topics
GET    /data/topics/:id
POST   /data/topics
PUT    /data/topics/:id
DELETE /data/topics/:id
Comments
http
Copy code
GET  /data/comments?where=topicId="{topicId}"
POST /data/comments
Likes
http
Copy code
GET    /data/likes?where=topicId="{topicId}"
GET    /data/likes?where=topicId="{topicId}" AND _ownerId="{userId}"
POST   /data/likes
DELETE /data/likes/:id
Profiles
http
Copy code
GET  /data/profiles?where=_ownerId="{userId}"
POST /data/profiles
PUT  /data/profiles/:id
Authentication
http
Copy code
X-Authorization: {accessToken}
Data Model
Topic
json
Copy code
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
Copy code
{
  "_id": "string",
  "topicId": "string",
  "text": "string",
  "authorName": "string"
}
Like
json
Copy code
{
  "_id": "string",
  "topicId": "string",
  "_ownerId": "string"
}
Profile
json
Copy code
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
Validation & Moderation
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

How to Run (Local Development)
Works with Node v22.21.1 on Windows 11.

Start the Client
bash
Copy code
cd path/to/project
cd client
npm install
npm install react-router-dom
npm run dev
Run Client Tests
bash
Copy code
cd path/to/project
cd client
npm install --save-dev jest @testing-library/react @testing-library/jest-dom babel-jest @babel/preset-env @babel/preset-react
npm test
Start the SoftUni Practice Server
bash
Copy code
cd path/to/project
cd server
npm install
npm start
Test Accounts
text
Copy code
peter@abv.bg   : 123456
george@abv.bg  : 123456
admin@abv.bg   : admin
Backend repository:
https://github.com/softuni-practice-server/softuni-practice-server

Security
Token-based authentication

Protected routes via route guards

Authorization header injection

Client-side access control

Known Limitations & Improvements
loadTopics() is called outside useEffect in some components

Profile topic loading could be optimized via backend queries

Bad words filter is simplistic and substring-based

Purpose of the Project
This project demonstrates:

SPA routing and global state management

REST communication and authentication

Component-driven UI architecture

Realistic frontend validation

Portfolio-level React application structure
