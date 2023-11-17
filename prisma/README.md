# Prisma Migrations

This document outlines the process of applying database migrations and other Prisma CLI commands useful in managing the database schema for this project.

## Prerequisites

- Ensure you have Prisma CLI installed globally on your machine:
  ```bash
  npm install -g prisma
  ```
- Make sure to have dotenv-cli installed to handle environment variables:
  ```bash
  npm install dotenv-cli --save-dev
  ```
- Environment variables are stored in `.env.development.local`. Ensure this file is correctly configured with your database credentials and other necessary variables.

## Applying Migrations

1. Navigate to the project directory:
   ```bash
   cd ./ResQueue
   ```
2. Generate a new migration (if needed):
   Create a new migration file for any changes made to the `prisma/schema.prisma` file:
   ```bash
   npx dotenv -e .env.development.local -- npx prisma migrate dev --name descriptive_name
   ```
3. Apply the migration:
   Apply the migration to update the database schema:
   ```bash
   npx dotenv -e .env.development.local -- npx prisma migrate deploy
   ```
4. Generate Prisma Client (if needed):
   If you're using Prisma Client, generate the client code:
   ```bash
   npx prisma generate
   ```
5. Verify the migration:
   Check your database to ensure the migration has been applied correctly.

## Additional Prisma Commands

- Introspect Database:
  Update your Prisma schema to reflect the current state of your database:
  ```bash
  npx prisma introspect
  ```
- Format Prisma Schema:
  Format your `prisma/schema.prisma` file to the standard format:
  ```bash
  npx prisma format
  ```
- View Migrate History:
  View the migration history of your database:
  ```bash
  npx prisma migrate status
  ```
- Seed Database:
  Seed your database with initial data (requires a `prisma/seed.ts` or `prisma/seed.js` file):
  ```bash
  npx prisma db seed
  ```
- Studio:
  Open Prisma Studio to view and edit your data:
  ```bash
  npx prisma studio
  ```

## Troubleshooting

- If you encounter environment variable not found errors, ensure your `.env.development.local` file is correctly configured and that you're loading it with dotenv-cli.
- For other issues, refer to the [Prisma documentation](https://www.prisma.io/docs/).

## Additional Resources

- [Prisma Migrations Documentation](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Dotenv CLI](https://www.npmjs.com/package/dotenv-cli)
