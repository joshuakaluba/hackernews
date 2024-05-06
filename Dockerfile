# Stage 1: Build environment
FROM node:18 as builder

# Set the working directory inside the builder stage
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build your Next.js application
RUN npm run build

# Stage 2: Production environment
FROM node:18-slim

# Set the working directory in the production environment
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# Expose the port Next.js runs on
EXPOSE 3000

# Command to run your app
CMD ["npm", "start"]
