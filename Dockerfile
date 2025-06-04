# Base image using Node.js 18 LTS
FROM node:18-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY ./Next/package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the Next.js application code
COPY ./Next/ ./

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Set up volume for persistent storage
VOLUME /app/data

# Command to run the app in production
CMD ["npm", "start"]
