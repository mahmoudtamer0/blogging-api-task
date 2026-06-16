# Blogging API

A simple blogging REST API built with Node.js, Express and PostgreSQL.

## Why PostgreSQL?
The data here is relational by nature — one user has many posts, so PostgreSQL 
made more sense than MongoDB for this use case.

## How to run locally

1. Clone the repo and install dependencies
   npm install

2. Create a .env file in the root with these values:

   PORT=3000
DB_URL=postgresql://neondb_owner:npg_K6Nqwh0pjSsT@ep-solitary-leaf-asfhzyop-pooler.c-4.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
JWT_SECRET=blogging_api@123211dedqdhq81321

    Database URL is the URL is my PostgreSQL database hosted on AWS RDS.
    JWT_SECRET is a secret key used to sign and verify JWT tokens.

    i provided the real DB_URL and JWT_SECRET in the .env file to make it easier to run locally.


4. npm run dev

## Endpoints

| Method | Endpoint        | Auth?  | Description              |
|--------|----------------|--------|--------------------------|
| POST   | /auth/register | No     | Create a new account     |
| POST   | /auth/login    | No     | Login and get a token    |
| GET    | /posts         | No     | Get all posts            |
| POST   | /posts         | Yes    | Create a post            |
| PUT    | /posts/:id     | Yes    | Update your post         |
| DELETE | /posts/:id     | Yes    | Delete your post         |

For protected routes, send the token in the Authorization header:
Authorization: Bearer your_token_here

## Notes
- Passwords are hashed using bcrypt
- JWT expires in 7 days
- You can only edit or delete posts you created