# Use Node.js as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./

# Install backend dependencies
RUN npm install

# Copy frontend files correctly
COPY frontend/package.json frontend/package-lock.json ./frontend/
WORKDIR /app/frontend
RUN npm install
WORKDIR /app

# Copy the full project
COPY . .

# Expose the application port (adjust as needed)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
