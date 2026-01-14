📰 Freelance News Board

Freelance News Board is a community-driven React Single Page Application (SPA) where freelancers can:

Share topics (news, job offers, stories)

Discover trending content

Interact through likes and comments

The project demonstrates real-world frontend architecture using React, React Router, Context API, form validation, protected routes, and REST-style communication with the SoftUni Practice Server backend.

📋 Table of Contents
Section	Description
🚀 Overview
	Project goals and high-level description
✨ Features
	User capabilities and functionality
👥 User Roles
	Role-based access control
🗺️ Application Routes
	Route definitions and protection
🏗️ Application Architecture
	Component and state structure
🛠️ Technology Stack
	Tools and libraries used
🔌 REST Endpoints
	API communication endpoints
📊 Data Model
	Data structure definitions
✅ Validation & Moderation
	Input validation rules
⚡ How to Run
	Setup and execution instructions
🔒 Security
	Security measures implemented
⚠️ Known Limitations
	Current limitations and future plans
🎯 Purpose
	Project objectives
👤 Author
	Contact information
🚀 Overview

The goal of Freelance News Board is to combine:

Community-driven discussions

Freelancer visibility and engagement

Topic categorization and discovery

Profile-based identity

This is a client-side SPA built entirely with React, while authentication and data persistence are handled via a REST-style backend.

↑ Back to Top

✨ Features
👤 User Features

User registration & login

Public pages

FAQ

Contact

Authenticated user area

Home feed with latest topics

Create topics (News / Job Offer / Story)

View topic details

Like / Unlike topics

Comment on topics

Search topics by title, author, or content

User profile page

Edit user profile (avatar + personal info)

🔍 Content Discovery

Category filters on the Home page

Full-text search across all topics

↑ Back to Top

👥 User Roles
Role	Description	Access Level
GUEST	Unauthenticated users	Login, Register, FAQ, Contact
USER	Registered users	Full access to topics, profiles, likes, comments
🔐 Route Protection

PrivateRoute

GuestRoute

↑ Back to Top

🗺️ Application Routes
🌐 Public Routes

/login

/register

/contact

/faq

🔒 Private Routes (Authenticated)

/ – Home (Latest Topics)

/topics/create

/topics/:topicId

/topics/search

/profile/edit

/users/:userId

🚫 Fallback

* – Not Found page

↑ Back to Top

🏗️ Application Architecture
📄 Pages

Home

Login / Register

TopicCreate

TopicDetails

TopicSearch

UserProfile

UserEdit

FAQ

Contact

NotFound

🌍 Global State (Context API)

AuthContext – authentication state

ProfileContext – user profile data

TopicsContext – topic loading & searching

LikeContext – like updates

TopicUpdateContext – topic refresh notifications

🔌 Services Layer

All HTTP requests are centralized in utils/api.js and separated into:

topicService.js

commentService.js

likeService.js

profileService.js

↑ Back to Top

🛠️ Technology Stack
🎨 Frontend

React

React Router DOM

Context API

Custom hooks (useForm)

Fetch API

CSS (global + component-scoped)

🗄️ Backend

SoftUni Practice Server

↑ Back to Top

🔌 REST Endpoints
📰 Topics
GET    /data/topics
GET    /data/topics/:id
POST   /data/topics
PUT    /data/topics/:id
DELETE /data/topics/:id

💬 Comments
GET  /data/comments?where=topicId="{topicId}"
POST /data/comments

❤️ Likes
GET    /data/likes?where=topicId="{topicId}"
GET    /data/likes?where=topicId="{topicId}" AND _ownerId="{userId}"
POST   /data/likes
DELETE /data/likes/:id

👤 Profiles
GET  /data/profiles?where=_ownerId="{userId}"
POST /data/profiles
PUT  /data/profiles/:id

🔑 Authentication
X-Authorization: {accessToken}


↑ Back to Top

📊 Data Model
📰 Topic
{
  "_id": "string",
  "_ownerId": "string",
  "title": "string",
  "content": "string",
  "category": "news | job | story",
  "authorName": "string",
  "createdAt": "ISO date"
}

💬 Comment
{
  "_id": "string",
  "topicId": "string",
  "text": "string",
  "authorName": "string"
}

❤️ Like
{
  "_id": "string",
  "topicId": "string",
  "_ownerId": "string"
}

👤 Profile
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


↑ Back to Top

✅ Validation & Moderation
📰 Topics

Title: 4–40 characters

Content: 11–400 characters

Category: required

Bad words filter (simple substring-based)

🔐 Registration

Email format validation

Username length & uniqueness

Forbidden usernames

Password confirmation

👤 Profile

Required personal fields

Age range: 1–120

Avatar must be a valid image URL

↑ Back to Top

⚡ How to Run

Environment:
Node v22.21.1 on Windows 11

▶️ Start the Client
cd path/to/project
cd client
npm install
npm install react-router-dom
npm run dev

🧪 Run Client Tests
cd path/to/project
cd client
npm install --save-dev jest @testing-library/react @testing-library/jest-dom babel-jest @babel/preset-env @babel/preset-react
npm test

🗄️ Start the SoftUni Practice Server
cd path/to/project
cd server
npm install
npm start

🔑 Test Accounts
Email	Password
peter@abv.bg
	123456
george@abv.bg
	123456
admin@abv.bg
	admin
🔗 Backend Repository

https://github.com/softuni-practice-server/softuni-practice-server

↑ Back to Top

🔒 Security

Token-based authentication

Protected routes via route guards

Authorization header injection

Client-side access control

↑ Back to Top

⚠️ Known Limitations & Improvements

loadTopics() is called outside useEffect in some components

Profile topic loading could be optimized via backend queries

Bad words filter is simplistic and substring-based

↑ Back to Top

🎯 Purpose of the Project

This project demonstrates:

SPA routing and global state management

REST communication and authentication

Component-driven UI architecture

Realistic frontend validation

Portfolio-level React application structure

↑ Back to Top

👤 Author

Kaloyan Dimitrov

GitHub:
https://github.com/LuckyKaloyan

LinkedIn:
https://www.linkedin.com/in/kaloyan-dimitrov-79a399203/

↑ Back to Top
