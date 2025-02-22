pipeline {
    agent {
        docker {
            image 'maven:3.8.5-openjdk-17'
            args '-v /var/run/docker.sock:/var/run/docker.sock' // Mount Docker socket
        }
    }
    environment {
        BACKEND_IMAGE = 'bhaskarkul/codesnippetmanager-backend'
        FRONTEND_IMAGE = 'bhaskarkul/codesnippetmanager-frontend'
    }
    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/BhaskarKulshrestha/CodeSnippetManager.git'
            }
        }
        stage('Build Backend') {
            steps {
                dir('backend') {
                    script {
                        docker.build(BACKEND_IMAGE)
                    }
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    script {
                        docker.build(FRONTEND_IMAGE)
                    }
                }
            }
        }
        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                    script {
                        docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                            docker.image(BACKEND_IMAGE).push()
                            docker.image(FRONTEND_IMAGE).push()
                        }
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                sshagent(['cf3cd84a-7d1a-4aed-a5c7-68fdc736bf3e']) {
                    sh '''
                    ssh bhaskarkul@your-deployment-server << EOF
                    docker pull bhaskarkul/backend:latest
                    docker pull bhaskarkul/frontend:latest
                    docker-compose -f /docker-compose.yml up -d
                    EOF
                    '''
                }
            }
        }
    }
}
