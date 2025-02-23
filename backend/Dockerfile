# Use Node.js LTS version
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Build frontend inside backend container
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# Move back to backend
WORKDIR /app
COPY . . 

# Expose the backend port
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
