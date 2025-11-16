# Server-node Exercise - OneRail Task

**Purpose**: Short instructions for running the project locally and with Docker, where to find Swagger documentation, and how to run tests.

**Run locally**
- **Install dependencies:**

```powershell
npm install
```

- **Copy environment variables:** create a `.env` file from `.env.example` and fill in values. Database config can be found in docker-compose.yml

- **Start in development mode:**

```powershell
npm run dev
```

- **Note:** Default application port can be checked in environment variable

**Seeding the database**
- You can seed the database with example data (organizations, users, orders) by running:

```powershell
npm run seed
```
This creates sample data useful for testing authentication and API endpoints.

**Run with Docker**
- **Build and run services (from project root):**

Modify .env to connect to database:
```
DB_HOST=db
DB_PORT=3306
DB_USER=db_user
DB_PASSWORD=db_password
DB_NAME=db_name
```

And then run:
```powershell
docker-compose up --build
```

- **Stop and remove containers:**

```powershell
docker-compose down
```

- **Access:** API will be available at `http://localhost:<PORT>`

**Swagger / API documentation**
- Swagger UI is available at `GET /swagger` once the application is running.

**Authentication**
- The API uses JWT-based authentication for protected routes. Obtain a token by calling the login endpoint:

- `POST /api/auth/login`

- Example credentials (created by the seed script):
	- `email`: `user1@example.com`
	- `password`: `password1`


- **Run tests:**

```powershell
npm test
```

- Unit tests use `jest` + `ts-jest` and mock repositories, so they do not require a running database.

**Design decisions (short notes)**
- **Error handling:** The app uses a custom `HttpException` and standardized JSON error responses
- **Logging:** Database state changes are logged at `info`; HTTP headers can be logged at `debug` (configured in `src/config/logger.ts`).
- **Tests:** Business logic is unit-tested with `jest` and mocked repositories - tests avoid touching the real database.