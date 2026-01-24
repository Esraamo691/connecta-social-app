# Connecta – Social Media Web Application

## Overview
**Connecta** is a modern social media web application that enables users to share posts, interact through comments, and manage their profiles in a clean and minimal interface.

The project focuses on core social features with a clear separation of concerns and a scalable structure, making it suitable as a graduation project or portfolio showcase.

---

## Features
- User authentication (Sign up / Sign in)
- Secure password management
- User profile management with profile photo upload
- Create, read, update, and delete posts
- View all posts or posts by a specific user
- Comment system with full CRUD operations
- Clean and responsive UI with no distracting elements

---

## Tech Stack

### Frontend
- React  
- Tailwind CSS  
- Flowbite  

### Backend
- RESTful API  
- Authentication & authorization  
- Modular endpoints structure (Users, Posts, Comments)

---

## API Structure
The backend follows a RESTful architecture with clearly organized endpoints.

### Users
- `POST /users/signup` – Register a new user  
- `POST /users/signin` – User login  
- `PATCH /users/change-password` – Change user password  
- `PUT /users/upload-profile-photo` – Upload profile picture  
- `GET /users/me` – Get logged-in user data  

### Posts
- `POST /posts` – Create a new post  
- `GET /posts` – Get all posts  
- `GET /posts/user/:id` – Get posts by user  
- `GET /posts/:id` – Get single post  
- `PUT /posts/:id` – Update post  
- `DELETE /posts/:id` – Delete post  

### Comments
- `POST /comments` – Create a comment  
- `GET /comments/post/:id` – Get post comments  
- `PUT /comments/:id` – Update comment  
- `DELETE /comments/:id` – Delete comment  

---

## UI & Design Philosophy
- Minimal and distraction-free interface  
- No unnecessary icons or visual noise  
- Focus on readability and usability  
- Responsive layout for different screen sizes  

---

## Project Purpose
This project was built to demonstrate:
- Real-world social media workflows  
- Clean frontend architecture using React  
- Proper handling of user-generated content  
- Practical use of modern UI frameworks  
- Full CRUD operations with meaningful interactions
