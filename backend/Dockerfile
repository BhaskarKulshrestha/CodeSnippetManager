# Use Node.js 14 as base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy and install backend dependencies
COPY package*.json ./
RUN npm install

# Build frontend
WORKDIR /app/frontend
COPY ../frontend/package.json ../frontend/package-lock.json ./
RUN npm install
COPY ../frontend ./
RUN npm run build

# Move back to backend folder
WORKDIR /app
COPY . .

# Expose backend port
EXPOSE 5000

# Start backend server
CMD ["npm", "start"]
