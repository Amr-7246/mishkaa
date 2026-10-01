## Mishkaa

Mishkaa is an academic teacher-focused educational platform designed to serve the Egyptian secondary school sector.
The platform is centered around teacher marketing and academic workflows + student all-in-one feature not just course listing app 

## Project Overview


Mishkaa aims to serve both: 
* Teacher.. via providing him centralized platform for marketing themselves and managing their academic activities instead of relying on disconnected tools and manual workflows.
* Student.. via providing him centralized platform that prevent his distraction between more than teacher website or youtube channels.

### Teacher features 
* Treat the teacher portfolio as the thing to market instead of the plain courses
* Secured courses hosting which is critical for them
* Do the heavy load of the technical work instead of overwhelming the teacher of it
* Dashboard provides the usual structured environment for managing educational content, students, assessments, academic activities, and the operational processes surrounding secondary education

### Student features 
* provide the one sound of truth to the student where centralize all of his subjects teachers at one place
* Friendly UI/UX + secured payment cycle
* Tracking academic activities
* Supporting structured academic workflows

The architecture is designed so additional educational features can be introduced without requiring major changes to the existing system.

## Target Market

Mishkaa is currently designed for the Egyptian secondary school sector.

The initial target audience includes:

* Secondary school teachers
* Students
* Educational content providers
* Platform administrators

The system can potentially be extended to support additional educational levels, subjects, institutions, and educational business models.

## Technology Stack

### Frontend

* TypeScript
* ReactNative
* Expo
* Modern component-based UI architecture (react native reusables)
* tansStack (reactQuery) + Axios (network layer)

### Backend + DB

* Node.js
* TypeScript
* NestJS
* typeOrm
* Cloudflare
* PostgreSQL

## Architecture
## Backend Structure
## Teacher Dashboard
## Content Management

## Data Modeling

PostgreSQL is used as the primary relational database.

A relational database was selected because the application's core domain contains strongly connected entities such as:

```text
Users
Teachers
Students
Courses
Content
Assessments
Questions
Submissions
Results
```

These relationships benefit from relational constraints, structured schemas, transactions, and predictable query behavior.

## Scalability Considerations

Although Mishkaa is currently targeted at the Egyptian secondary school sector, the architecture is designed with future growth in mind.

Potential scaling requirements include:

* Increasing numbers of teachers
* Increasing student populations
* Large educational content libraries
* Frequent assessment submissions
* Increased API traffic
* Background processing
* File and media storage
* Reporting and analytics

The modular backend architecture allows individual domains to evolve independently as the platform grows.

## Security Considerations

Security is considered across multiple layers of the application.

Key considerations include:

* Authentication
* Role-based authorization
* Request validation
* Protected API endpoints
* Secure password handling
* Environment-based secrets
* Input sanitization
* Controlled data access
* Server-side permission enforcement

Sensitive configuration values are kept outside the source code through environment variables.

## Engineering Decisions

### Why TypeScript?

TypeScript provides static typing across the frontend and backend, reducing inconsistencies between API contracts and client-side models while making the codebase easier to maintain as the project grows.

### Why NestJS?

NestJS provides a structured architecture for Node.js applications and encourages modularity, dependency injection, separation of concerns, and testable business logic.

### Why Next.js (later)?

Next.js provides a flexible React-based framework for building the web application while supporting different rendering and data-fetching strategies as the platform evolves.

### Why PostgreSQL?

The educational domain contains many strongly related entities and transactional workflows. PostgreSQL provides relational integrity, transactions, indexing, and mature querying capabilities suitable for this type of application.

## Challenges

## Future Improvements

Potential future development areas include:

* Advanced student performance analytics
* More comprehensive assessment capabilities
* Real-time notifications
* Advanced educational content management
* Search and filtering improvements
* Recommendation systems
* Automated reporting
* Background job processing
* Caching
* Advanced administrative analytics
* Mobile applications
* Expanded support for additional educational levels
* Integration with external educational services

## Project Status

Mishkaa is currently an evolving project focused on the Egyptian secondary education market.

The current implementation establishes the core architecture and domain model required for further development of the platform.

## Repository Structure

A simplified representation of the project structure:

```text
mishkaa/
|
+-- expo/
|   +-- components/
|   +-- pages/
|   +-- features/
|   +-- hooks/
|   +-- services/
|   +-- types/
|
+-- nest/
|   +-- modules/
|   +-- common/
|   +-- guards/
|   +-- decorators/
|   +-- services/
|   +-- database/
|
+-- README.md
```

The exact structure may evolve as additional domain modules are introduced.

## Running the Project

Clone the repository:

```bash
git clone <repository-url>
cd mishkaa
```

Install dependencies:

```bash
npm install
```

Create the required environment configuration:

```bash
cp .env.example .env
```

Configure the required environment variables.

Start the development environment:

```bash
npm run dev
```

The exact commands may vary depending on the frontend and backend workspace configuration.

## Environment Variables

Environment-specific configuration should be provided through environment variables rather than committed to the repository.

Typical configuration may include:

```env
DATABASE_URL=
JWT_SECRET=
API_URL=
NEXT_PUBLIC_API_URL=
```

Never commit production secrets or private credentials to the repository.

## Development Philosophy

Mishkaa is developed around several principles:

* Keep business logic independent from presentation logic
* Prefer modular architecture over tightly coupled features
* Validate data at system boundaries
* Enforce authorization on the server
* Design database relationships explicitly
* Keep APIs predictable and maintainable
* Build features around real educational workflows
* Prefer extensibility over premature complexity

## Author

Developed as a full-stack software engineering project with a focus on educational technology, scalable application architecture, and real-world business workflows.
