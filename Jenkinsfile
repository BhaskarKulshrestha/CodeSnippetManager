pipeline {
    agent {
        docker {
            image 'maven:3.8.5-openjdk-17'
            args '-v /var/run/docker.sock:/var/run/docker.sock' // Mount Docker socket
        }
    }
    environment {
        DOCKER_IMAGE = 'bhaskarkul/codesnippetmanager:latest'
    }
    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/BhaskarKulshrestha/CodeSnippetManager.git'
            }
        }
        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }
        stage('Docker Build & Push') {
            steps {
                script {
                    docker.build("$DOCKER_IMAGE")
                    withCredentials([string(credentialsId: 'docker-hub-password', variable: 'DOCKER_HUB_PASSWORD')]) {
                        sh 'echo $DOCKER_HUB_PASSWORD | docker login -u bhaskarkul --password-stdin'
                    }
                    sh 'docker push $DOCKER_IMAGE'
                }
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker run -d -p 8081:8080 $DOCKER_IMAGE'
            }
        }
    }
}
