#!/bin/bash

# Function to generate a random password
generate_password() {
  openssl rand -base64 16
}

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
  cp .env.example .env 2>/dev/null || touch .env
fi

# Generate Laravel APP_KEY if it doesn't exist
if ! grep -q "^APP_KEY=" .env || grep -q "^APP_KEY=$" .env; then
  APP_KEY="base64:$(openssl rand -base64 32)"
  sed -i "/^APP_KEY=/c\APP_KEY=$APP_KEY" .env || echo "APP_KEY=$APP_KEY" >> .env
  echo "Generated new Laravel APP_KEY"
fi

# Generate NextAuth Secret if it doesn't exist
if ! grep -q "^NEXTAUTH_SECRET=" .env || grep -q "^NEXTAUTH_SECRET=$" .env; then
  NEXTAUTH_SECRET="$(openssl rand -hex 32)"
  sed -i "/^NEXTAUTH_SECRET=/c\NEXTAUTH_SECRET=$NEXTAUTH_SECRET" .env || echo "NEXTAUTH_SECRET=$NEXTAUTH_SECRET" >> .env
  echo "Generated new NEXTAUTH_SECRET"
fi

# Generate database passwords if they don't exist
if ! grep -q "^DB_PASSWORD=" .env || grep -q "^DB_PASSWORD=$" .env; then
  DB_PASSWORD="$(generate_password)"
  sed -i "/^DB_PASSWORD=/c\DB_PASSWORD=$DB_PASSWORD" .env || echo "DB_PASSWORD=$DB_PASSWORD" >> .env
  echo "Generated new DB_PASSWORD"
fi

if ! grep -q "^MYSQL_ROOT_PASSWORD=" .env || grep -q "^MYSQL_ROOT_PASSWORD=$" .env; then
  MYSQL_ROOT_PASSWORD="$(generate_password)"
  sed -i "/^MYSQL_ROOT_PASSWORD=/c\MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD" .env || echo "MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD" >> .env
  echo "Generated new MYSQL_ROOT_PASSWORD"
fi

echo "Secrets generated successfully. Your .env file has been updated."
echo "WARNING: DO NOT commit the .env file to version control."

