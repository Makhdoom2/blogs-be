<p align="center">
  <h2 align="center">Blogs Backend — Nest.js (DEMO PROJECT)</h2>
</p>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This is the backend API for a Blogging Platform built using **NestJS**, a powerful **Node.js** framework for building efficient and scalable server-side applications. The API supports a blogging platform with features like user authentication, role-based access control (RBAC), and CRUD operations for blog posts.

### Key Features

- **User Authentication**: Register and login with JWT authentication.
- **Role-Based Access Control (RBAC)**: 
  - Users can manage their own blog posts.
  - Admins can manage all posts (approve, publish, delete) and user permissions.
- **CRUD Blog Posts**:
  - Users can create, read, update, and delete their own posts.
  - Admins have full control over posts (approve, delete posts).
- **Admin Dashboard**:
  - Admins can approve user posts, block/unblock users, and manage user roles.
- **Pagination**: Paginated blog post listings.
- **Search and Filter**: Search blog posts by title.
- **Image Upload**: Optional image upload for blog posts (base64, with plans to integrate with AWS S3).

## Tech Stack

- **NestJS**: A framework for building scalable applications with Node.js and TypeScript.
- **TypeScript**: For static typing and better developer experience.
- **MongoDB**: NoSQL database to store user data and blog posts.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **JWT**: JSON Web Tokens for secure authentication and user sessions.
- **Passport.js**: Authentication middleware used with JWT.
- **Bcrypt**: For securely hashing user passwords.
- **Zod**: Type-safe schema validation library for data validation.

## Project setup

```bash
$ npm install
```
### Configure Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
PORT=4000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key


## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


### Endpoints

#### Authentication Endpoints

- **POST** `/api/auth/register`  
  Register a new user.

- **POST** `/api/auth/login`  
  Login and receive a JWT token.

#### Blog Endpoints

- **GET** `/api/posts`  
  Fetch all blog posts (public endpoint).  
  - **Admin**: If the request contains an admin token, all posts (both published and unpublished) will be returned.  
  - **User/No Token**: If no token or a user token is provided, only published posts will be returned.

- **GET** `/api/posts/:id`  
  Fetch a single blog post by ID.

- **POST** `/api/posts`  
  Create a new blog post (requires JWT authentication).

- **PUT** `/api/posts/:id`  
  Update an existing blog post (requires JWT authentication and the user must be the blog owner).

- **DELETE** `/api/posts/:id`  
  Delete a blog post (requires JWT authentication; can be performed by the admin or the blog owner).

- **PUT** `/api/posts/:id/publish`  
  Publish a blog post (requires Admin role).

#### Admin Endpoints

- **GET** `/api/admin/users`  
  Fetch all users (requires Admin role).

- **PATCH** `/api/admin/users/:id/permission`  
  Block or unblock a user (requires Admin role).

- **PUT** `/api/admin/posts/:id/approve`  
  Approve a blog post for publication (requires Admin role).



## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
