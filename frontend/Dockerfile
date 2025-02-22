# Use Node.js to build the app
FROM node:18 as build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Use Nginx to serve static files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

FROM jenkins/jenkins:lts
USER root
RUN apt-get update && \
    apt-get install -y docker.io && \
    usermod -aG docker jenkins
USER jenkins

