# Use Node.js LTS version
FROM node:18

# Set working directory
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install


# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Build the React application
COPY . .
RUN npm run build

# Use Nginx to serve the built React app
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Expose the frontend port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
