## Sisyphus Invoice Management

### Overview

This repository constitutes an early version of a centralized invoice management application designed for small business owners in the food and beverage industry. Many operators rely on a suite of compartmentalized subscription-based solutions, and this often results in an expensive, time-consuming, and frustrating experience. The goal of this application is to consolidate various solutions and streamline the handling of invoices, distributor accounts, and routine revenue reconciliation. A more developed version of this application would provide an integrated solution for business owners and their employees to manage their data all in one place rather than through a number of different walled-garden technologies.

At present, this full-stack solution provides a robust backend foundation for managing users, products, invoices, associated business and distributor entities, and their relationships. Consistent and efficient data management has been prioritized throughout the development process to ensure a seamless integration between the frontend and backend and to enable type-safe API routing and database operations. The application leverages Clerk and custom middleware to ensure proprietary data is only accessible to authenticated and authorized users, and provides a pleasant, responsive user interface consisting of Material-UI and custom styled components. It is currently hosted on Vercel, but can be similarly deployed elsewhere as necessary.

### Technologies

**TypeScript:** Ensures type safety and improves code readability and maintainability allowing for easy modifications and extensions.

**Next.js:** A framework for flexible React applications, supporting serverless functions and API routes.

**tRPC:** Enables type-safe APIs to ensure seamless integration between the frontend and backend.

**Prisma:** ORM for type-safe database operations; serves a single source of truth for database schema enabling type-safe database operations.

**PostgreSQL:** Relational database system facilitating complex queries and providing transactional integrity.

**Clerk:** Provides authentication and user management, seamlessly integrated with frontend components.

**Zod:** Employs schema validation for robust data integrity checks across the application.

**Styled Components + Formik:** Manage styles and forms with ease, enhancing the customizability and functionality of UI components.

**Yup:** Works alongside Formik for schema-based form validation.

### Production Deployment

The application can be accessed by visiting [here](https://sisyphus-gamma.vercel.app/).
When prompted to login through Clerk's Google Provider, use the following credentials: `capstone.userexample@gmail.com` + `SisyphusUser1`.

### Setup and Installation

1. Clone the repository with `git clone https://github.com/xxxxx/xxx` *[1]
2. Install dependencies with `npm install`.
3. Copy the `.env.example` file to a new file named `.env` and fill in appropriate environment variables.
4. Set up your database with `npm run postinstall`, `npm run db:push`, and `npm run db-seed`. *[2]
5. To start the application in development mode with live reloading: `npm run dev`.
6. To run tests using Vitest: `npm run test`.

* [1] Placeholder as I will submit this in a different repository.
* [2] These instructions aren't usable until I set up a docker image of my database per start-database.sh.
