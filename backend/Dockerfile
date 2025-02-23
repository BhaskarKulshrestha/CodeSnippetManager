version: "3.8"

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    volumes:
      - ./backend:/app
    depends_on:
      - mongo
    environment:
      - MONGO_URI=mongodb://mongo:27017/snippetDB
    restart: unless-stopped

  frontend:
    build:
      context: ./frontend
    ports:
      - "3000:3000"
    restart: unless-stopped
    depends_on:
      - backend

  mongo:
    image: mongo
    container_name: mongo
    ports:
      - "27017:27017"
    restart: unless-stopped

  nginx:
    build:
      context: .
      dockerfile: nginx.Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend
      - frontend
    restart: unless-stopped
