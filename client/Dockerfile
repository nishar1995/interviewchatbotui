# Base image
FROM node:18 AS base

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Build the project
RUN npm run build

# Production image
FROM node:18 AS final

# Set working directory
WORKDIR /app

# Copy built files from build stage
COPY --from=base /app ./

# Expose the Next.js server port
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]
