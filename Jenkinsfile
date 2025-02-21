pipeline {
    agent {
        docker {
            image 'maven:3.8.5-openjdk-17'
        }
    }
    environment {
        DOCKER_IMAGE = "your-dockerhub-bhaskarkul/codesnippetmanager:latest"
    }
    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/your-repo/CodeSnippetManager.git'
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
                    sh 'docker build -t $DOCKER_IMAGE .'
                    sh 'echo "$Bhaskar#04" | docker login -u "$bhaskarkul" --password-stdin'
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
