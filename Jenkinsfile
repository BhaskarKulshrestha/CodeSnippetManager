// pipeline {
//     agent any

//     stages {
//         stage('Checkout') {
//             steps {
//                 git branch: 'main', url: 'https://github.com/BhaskarKulshrestha/CodeSnippetManager.git'
//             }
//         }

//         stage('Build Backend') {
//             steps {
//                 echo 'Building Backend...'
//             }
//         }

//         stage('Build Frontend') {
//             steps {
//                 echo 'Building Frontend...'
//             }
//         }
//     }
// }

pipeline {
    agent any

    triggers {
        pollSCM('* * * * *') // Checks Git every minute for changes
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/BhaskarKulshrestha/CodeSnippetManager.git'
            }
        }

        stage('Set up Node.js') {
            steps {
                script {
                    sh "nvm use $NODE_VERSION || nvm install $NODE_VERSION"
                }
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    sh "cd backend && npm run build"
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    sh "cd frontend && npm run build"
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh "cd backend && npm test || echo 'Backend tests failed!'"
                    sh "cd frontend && npm test || echo 'Frontend tests failed!'"
                }
            }
        }
    }

    post {
        failure {
            echo 'Build failed! Check logs for errors.'
        }
    }
}
