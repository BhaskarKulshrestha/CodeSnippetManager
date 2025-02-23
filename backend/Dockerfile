# Use Node.js LTS version
FROM node:14

# Set working directory for backend
WORKDIR /app

# Copy backend package files and install dependencies
COPY package*.json ./
RUN npm install

# Build frontend
WORKDIR /app/frontend
COPY ../frontend/package.json ../frontend/package-lock.json ./
RUN npm install
COPY ../frontend ./
RUN npm run build

# Move back to backend
WORKDIR /app
COPY . . 

# Expose the backend port
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
