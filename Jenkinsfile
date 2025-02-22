pipeline {
    agent {
        docker {
            image 'jenkins-docker-agent' // Use your custom image
            args '-v /var/run/docker.sock:/var/run/docker.sock'
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
                        sh 'docker build -t ${BACKEND_IMAGE} .'
                    }
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    script {
                        sh 'docker build -t ${FRONTEND_IMAGE} .'
                    }
                }
            }
        }
        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                    script {
                        sh "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}"
                        sh "docker push ${BACKEND_IMAGE}"
                        sh "docker push ${FRONTEND_IMAGE}"
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                sshagent(['cf3cd84a-7d1a-4aed-a5c7-68fdc736bf3e']) {
                    sh '''
                    ssh bhaskarkul@your-deployment-server << EOF
                    docker pull ${BACKEND_IMAGE}:latest
                    docker pull ${FRONTEND_IMAGE}:latest
                    docker-compose -f /docker-compose.yml up -d
                    EOF
                    '''
                }
            }
        }
    }
}