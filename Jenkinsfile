pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "codesnippetmanager"
        DOCKER_TAG = "latest"
    }

    stages {
        stage('Checkout') {
            steps {
               git branch: 'main', url: 'https://github.com/BhaskarKulshrestha/CodeSnippetManager.git'
            }
        }

        stage('Build Backend') {
            steps {
                sh 'docker-compose build backend'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'docker-compose build frontend'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'docker-compose run backend npm test'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}
