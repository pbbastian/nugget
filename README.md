# 🍗 Nugget

A recipe database for nutrient tracking

---

## Prerequisites

Ensure the following are installed on your system:

- [Node.js](https://nodejs.org/) (v20.18.1)
- [PostgreSQL](https://www.postgresql.org/)
- [TablePlus](https://tableplus.com/) or a similar database GUI tool

### Additional Step: Configure PostgreSQL

1. Open TablePlus (or your preferred GUI tool).
2. Connect to your local PostgreSQL instance.
3. Create a new database named `nugget`.

---

## Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd nugget
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the following:

   ```env
   PGHOST=localhost
   PGPORT=5432
   PGDATABASE=nugget
   PGUSER=<your_username>
   PGPASSWORD=<your_password>
   ```

4. **Prepare the Project**:
   Run the post-installation script to set up the application:

   ```bash
   npm run postinstall
   ```

5. **Run Database Migrations**:
   Ensure PostgreSQL is running and migrate the database:

   ```bash
   npm run migrate up
   ```

---

## Running the Project

### Development Mode

To start the development server:

```bash
  npm run dev
```

### Production Build

To build and preview the production version:

1. Build the project:

   ```bash
   npm run build
   ```

2. Preview the production build:

   ```bash
   npm run preview
   ```

---

## Updating the Database

To apply new migrations or update the database schema, use the following command:

```bash
  npm run migrate up
```

Ensure that PostgreSQL is running and your `.env` file is correctly configured before running the command.

