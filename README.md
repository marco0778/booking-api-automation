# Booking API Automation

A RESTful Booking API built using Express.js, Prisma ORM, PostgreSQL (Supabase), and JWT Authentication.

This project was created as a portfolio project to demonstrate backend development skills, including authentication, authorization, database integration, CRUD operations, validation, and API testing readiness.

---

## Features

### Authentication

* User Registration
* User Login
* Password Hashing using bcrypt
* JWT Authentication

### Booking Management

* Create Booking
* Get All User Bookings
* Get Booking By ID
* Search Booking By Title
* Update Booking
* Delete Booking

### Security

* Password hashing with bcrypt
* JWT Authorization
* Ownership validation (users can only access their own bookings)

### Validation

* Email validation
* Password validation
* Booking title validation
* Booking date validation

---

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL
* Supabase

### ORM

* Prisma ORM

### Authentication

* JWT (jsonwebtoken)
* bcrypt

---

## Project Structure

```text
src
├── config
│   └── prisma.js
├── controllers
│   ├── authController.js
│   ├── bookingController.js
│   └── adminController.js
├── middleware
│   └── authMiddleware.js
├── routes
│   ├── authRoutes.js
│   ├── bookingRoutes.js
│   └── adminRoutes.js
└── index.js

prisma
├── migrations
└── schema.prisma
```

---

## Database Schema

### User

| Field     | Type     |
| --------- | -------- |
| id        | UUID     |
| email     | String   |
| password  | String   |
| createdAt | DateTime |
| updatedAt | DateTime |

### Booking

| Field     | Type     |
| --------- | -------- |
| id        | Integer  |
| userId    | UUID     |
| title     | String   |
| date      | DateTime |
| createdAt | DateTime |

---

## API Endpoints

### Authentication

#### Register

```http
POST /auth/register
```

#### Login

```http
POST /auth/login
```

---

### Booking

#### Create Booking

```http
POST /bookings
```

#### Get All Bookings

```http
GET /bookings
```

#### Get Booking By ID

```http
GET /bookings/:id
```

#### Search Booking By Title

```http
GET /bookings/search?searchTitle=value
```

#### Update Booking

```http
PUT /bookings/:id
```

#### Delete Booking

```http
DELETE /bookings/:id
```

---

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
PORT=3000
```

---

## Installation

Clone repository:

```bash
git clone https://github.com/marco0778/booking-api-automation.git
```

Install dependencies:

```bash
npm install
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Start development server:

```bash
npm run dev
```

---

## Future Improvements

* Swagger/OpenAPI Documentation
* Refresh Token Authentication
* Role Based Authorization
* Pagination
* Docker Support
* CI/CD Integration

---

## Related Project

Automation test suite for this API:

https://github.com/marco0778/booking-api-automation-tests

---

## Author

Marco Maureece

Backend & QA Automation Portfolio Project
