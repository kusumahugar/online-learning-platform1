# Online Learning Platform

A full-stack online learning platform with React, Vite, Node.js, Express, MongoDB, JWT authentication, Tailwind CSS, Docker, and Jenkins.

## Features

- User registration and login
- Student and admin roles
- Course browsing and details
- Admin dashboard for course management
- Enrollment functionality
- Responsive UI with Tailwind CSS
- Error handling and loading states

## Architecture

- `frontend/`: React + Vite application
- `backend/`: Express API with MongoDB and JWT auth
- `docker-compose.yml`: Multi-container Docker setup
- `Jenkinsfile`: CI pipeline stages

## Prerequisites

- Docker
- Docker Compose
- Git
- (Optional) Jenkins installed for pipeline execution

## Local Development with Docker

1. Copy environment example files:
   ```bash
   cd backend
   copy .env.example .env
   ```
2. Start the full stack:
   ```bash
   docker compose up --build
   ```
3. Visit the applications:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

## Backend Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/courses`
- `POST /api/courses`
- `PUT /api/courses/:id`
- `DELETE /api/courses/:id`

## Jenkins Pipeline

The included `Jenkinsfile` builds Docker images, starts containers, and verifies running services.
