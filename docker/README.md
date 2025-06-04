# Environment Variables Setup

## Overview

This project uses Docker Compose with environment variables to securely configure both the Laravel backend and Next.js frontend applications. This document explains how to set up and manage these environment variables.

## Quick Setup

1. Make the generate-secrets script executable:
   ```bash
   chmod +x docker/generate-secrets.sh
   ```

2. Run the script to generate secure secrets:
   ```bash
   ./docker/generate-secrets.sh
   ```

3. Start the Docker Compose services:
   ```bash
   docker-compose up -d
   ```

## Environment Variables

### Laravel Backend

The Laravel application requires the following environment variables:

- **Database Configuration**:
  - `DB_CONNECTION`: Database driver (mysql)
  - `DB_HOST`: Database host (mysql)
  - `DB_PORT`: Database port (3306)
  - `DB_DATABASE`: Database name
  - `DB_USERNAME`: Database username
  - `DB_PASSWORD`: Database password (secret)

- **Application Configuration**:
  - `APP_NAME`: Application name
  - `APP_ENV`: Application environment (local, production)
  - `APP_KEY`: Application encryption key (auto-generated)
  - `APP_DEBUG`: Debug mode (true/false)
  - `APP_URL`: Application URL

- **Cache and Session**:
  - `CACHE_DRIVER`: Cache driver
  - `SESSION_DRIVER`: Session driver
  - `QUEUE_CONNECTION`: Queue connection

### Next.js Frontend

The Next.js application requires the following environment variables:

- **API Configuration**:
  - `NEXT_PUBLIC_API_URL`: Laravel API URL
  - `NEXT_PUBLIC_BACKEND_URL`: Laravel backend URL

- **Authentication**:
  - `NEXTAUTH_URL`: NextAuth URL
  - `NEXTAUTH_SECRET`: NextAuth secret (auto-generated)

- **OAuth Providers** (optional):
  - `GOOGLE_ID` and `GOOGLE_SECRET`: Google OAuth
  - `LINKEDIN_CLIENT_ID` and `LINKEDIN_CLIENT_SECRET`: LinkedIn OAuth
  - `FACEBOOK_CLIENT_ID` and `FACEBOOK_CLIENT_SECRET`: Facebook OAuth

## Security Best Practices

1. **Never commit .env files to version control**. The .gitignore file is configured to exclude these files.

2. **Use the generate-secrets.sh script** to generate secure random values for sensitive environment variables.

3. **Use different passwords for different environments**. Development, staging, and production should all have different secrets.

4. **Rotate secrets periodically**, especially in production environments.

5. **Limit access to the .env file** to only those who need it.

## Adding New Environment Variables

If you need to add new environment variables:

1. Add them to the `.env` file in the project root
2. Update the Docker Compose file to pass these variables to the appropriate services
3. Document them in this README

