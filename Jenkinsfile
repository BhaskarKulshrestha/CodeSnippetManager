pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/BhaskarKulshrestha/CodeSnippetManager.git'
            }
        }

        stage('Build Backend') {
            steps {
                echo 'Building Backend...'
            }
        }

        stage('Build Frontend') {
            steps {
                echo 'Building Frontend...'
            }
        }
    }
}
