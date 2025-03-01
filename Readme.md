# CodeSnippetManager

## Overview
CodeSnippetManager is a DevOps-integrated application designed to store, manage, and retrieve code snippets efficiently. This project features a CI/CD pipeline using Jenkins and containerization with Docker and Docker Compose. Additionally, Nginx is configured as a reverse proxy to manage requests.

## Features
- **Code Snippet Management**: Store and organize reusable code snippets.
- **CI/CD Integration**: Automated pipeline setup using Jenkins.
- **Containerization**: Docker and Docker Compose for service orchestration.
- **Reverse Proxy**: Nginx for handling incoming requests.
- **Security**: Uses private SSH keys for secure communication.

## Project Structure
```
CodeSnippetManager-main/
│-- Dockerfile.jenkins-docker  # Docker setup for Jenkins
│-- Jenkinsfile                # CI/CD pipeline definition
│-- docker-compose.yml         # Docker Compose setup
│-- nginx.Dockerfile           # Nginx Docker setup
│-- nginx.conf                 # Nginx configuration
│-- .gitignore                 # Git ignored files
│-- package-lock.json          # Project dependencies
│-- bhaskar_private_key.pem    # Private SSH key (ensure this is kept secure)
│-- src/                       # Application source code
|-- frontend/
|-- backend/
```

## Setup and Installation
### Prerequisites
- Docker & Docker Compose
- Jenkins
- Git
- Nginx

### Installation Steps
1. **Clone the Repository**
   ```sh
   git clone https://github.com/BhaskarKulshrestha/CodeSnippetManager.git
   ```

2. **Build and Start Services**
   ```sh
   docker-compose up --build -d
   ```

3. **Access the Application**
   - Web UI: `http://localhost`
   - Jenkins UI: `http://localhost:8080`
   
## CI/CD Pipeline
The Jenkinsfile defines the CI/CD pipeline:
- **Build**: Containerized build process
- **Test**: Runs unit and integration tests
- **Deploy**: Deploys containers via Docker Compose

## Usage
- Users can add, retrieve, and manage code snippets via the web UI.
- The DevOps pipeline ensures automated testing and deployment.

## Security Considerations
- **Sensitive Keys**: Ensure `bhaskar_private_key.pem` is secured and never committed to public repositories.
- **Environment Variables**: Use `.env` files for sensitive configurations.

## License
This project is licensed under the MIT License.

## Contributions
Contributions are welcome! Please create a pull request for review.

## Contact
For questions or issues, please open a GitHub issue.
