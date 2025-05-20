# Alison Full Stack Developer Assessment (Next.js 15.2.0)

This project implements a full-stack web application using Next.js 15.2.0 (App Router), React, PostgreSQL, and Material UI as per the Alison Full Stack Developer Assessment requirements.

## Features
- **Numbers Page (`/numbers`)**: Allows users to submit integers and displays a table of adjacent number pairs with their sums. Uses raw SQL for data operations.
- **Grades Page (`/grades`)**: Provides a form to submit grades (0-100) for classes (Math, Science, History) with validation and raw SQL operations.
- **Navigation**: Top navigation bar for switching between pages.
- **UI**: Material UI for consistent and responsive design.
- **Error Handling**: Client-side validation, error boundaries, and loading states.
- **Database**: PostgreSQL with raw SQL queries via `postgres` client, connection pooling enabled.

## Bonus Features
- **Unit and Integration Tests**: Jest and React Testing Library tests for `GradesForm` and `/api/grades` (see `__tests__/`). Run `pnpm test` to execute.
- **Performance Optimizations**: Connection pooling in `lib/db.js` and `no-store` cache control for POST requests in `/api/grades`.
- **Input Validation**: Client-side validation in `GradesForm` and server-side validation in `/api/grades`.
- **Error Boundary**: Implemented in `app/grades/ErrorBoundary.js` to handle unexpected errors on the Grades page.

## Assumptions and Decisions
- Used Next.js 15.2.0 with the App Router for modern routing and server-side capabilities.
- Implemented client-side and server-side validation for robust input checking.
- Used Material UI for a modern, responsive UI with Tailwind CSS for additional styling.
- Database schema includes constraints for grades (0-100) and valid class names.
- API routes handle data operations, maintaining separation of concerns.
- Tests cover form rendering, validation, submission, and API behavior.

## Setup Instructions
1. **Install Node.js and pnpm**:
   - Use `nvm` or `fnm` to install Node.js (version compatible with Next.js 15.2.0, e.g., 18.x or 20.x).
   - Install pnpm: `npm install -g pnpm`.

2. **Set up PostgreSQL**:
   ```bash
   docker-compose up -d