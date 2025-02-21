# Full-Stack Blog Application

This repository contains a full-stack blog application that features a React frontend and an Express/Node.js backend. The application allows users to create, update, and delete blog posts, with images being handled via Cloudinary and data stored in PostgreSQL.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Project Overview
This project is a complete blog management system. Users can sign in, create posts with images, update them, or delete them. The frontend is built using React (with libraries such as React Router, Axios, and React Toastify), and the backend is built on Express/Node.js with PostgreSQL as the database. Cloudinary is used for uploading and hosting images.

## Features
- **User Authentication:** Secure user sign-in and sign-out.
- **CRUD Operations:** Create, read, update, and delete blog posts.
- **Image Uploads:** Handle image uploads with Cloudinary.
- **Responsive Design:** A clean, responsive UI using Tailwind CSS.
- **Notifications:** Toast notifications to alert users on actions like updates or errors.

## Project Structure
The project is organized into two main folders:


- **Frontend:** Contains components, pages, and assets for the React application.
- **Backend:** Contains API routes, database connection files, and Cloudinary integration for image uploads.

# Project Setup Instructions

This guide covers how to set up both the backend and frontend of the project in one file.

---

## Backend Setup

1. **Navigate to the backend folder:**

   ```bash
   cd backend
2.**Install dependencies:**

   
     npm install 
3.**Configure Environment Variables:**

    PORT=5001
    DATABASE_URL=your_postgres_database_url
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret

4.**Run the Backend Server:**

    
     npm install 
  
# Frontend Setup and API Documentation

## Frontend Setup Instructions

1. **Navigate to the frontend folder:**

   ```bash
   cd frontend
2.**Install dependencies:**

   
     npm install 

3.**Run the Backend Server:**

    
     npm install 
  


cat << 'EOF' > API_AND_GIT.md
# API Endpoints Documentation

Below are the available API endpoints with brief descriptions:

------------------------------------------------------------
# User Authentication Endpoints

Signup - Create a new user account.
POST http://localhost:5001/api/user/auth/signup

Login - Log in using your credentials.
POST http://localhost:5001/api/user/auth/login

Logout - Logs out the current user.
POST http://localhost:5001/api/user/auth/logout

Check Authentication - Verifies if the user is authenticated.
GET http://localhost:5001/api/user/auth/checkAuth

------------------------------------------------------------
# Blog Management Endpoints (User)

Add Blog - Create a new blog post.
POST http://localhost:5001/api/user/blog/add

Delete Blog - Deletes a specific blog post (example: id 4).
DELETE http://localhost:5001/api/user/blog/delete/:id

Get My Posts - Retrieves all blog posts created by the logged-in user.
GET http://localhost:5001/api/user/blog/my-posts

Get Specific My Post - Retrieves a specific blog post (example: id 13) for the logged-in user.
GET http://localhost:5001/api/user/blog/my-posts/:id

Filter Blogs - Filters user's blog posts based on query parameters.
GET http://localhost:5001/api/user/blog/filter

------------------------------------------------------------
# Blog Management Endpoints (Home)

Get Home Posts - Retrieves all blog posts for the home page.
GET http://localhost:5001/api/home/posts

Get Specific Home Post - Retrieves a specific blog post on the home page (example: id 1).
GET http://localhost:5001/api/home/posts/:id

Filter Home Posts - Filters home posts based on category and title.
GET http://localhost:5001/api/home/filter?category=exams&title=mid

------------------------------------------------------------

# Git Commands Documentation

Below are some common Git commands for managing your repository:

Initialize a new Git repository:
git init

Clone an existing repository:
git clone <repository-url>

Check the status of your repository:
git status

Stage changes for commit:
git add .

Commit your staged changes:
git commit -m "Your commit message"

View commit history:
git log

Push your commits to the remote repository:
git push origin main

Force push (use with caution):
git push --force origin main

Create a new branch:
git branch <branch-name>

Switch to a branch:
git checkout <branch-name>

Merge a branch into the current branch:
git merge <branch-name>




  


