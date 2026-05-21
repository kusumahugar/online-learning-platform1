pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = 'online-learning-platform1'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                bat 'docker compose build --pull'
            }
        }

        stage('Start Containers') {
            steps {
                bat 'docker compose up -d'
            }
        }

        stage('Verify Containers Are Running') {
            steps {

                // Show running containers
                bat 'docker compose ps'
                bat 'docker ps'

                // Wait for backend startup
                bat 'timeout /t 15'

                // Retry backend health check
                script {
                    retry(5) {
                        bat 'curl -f http://localhost:5000'
                        bat 'timeout /t 5'
                    }
                }
            }
        }
    }

    post {

        always {
            bat 'docker ps'
        }

        success {
            echo 'Deployment completed successfully!'
        }

        failure {
            echo 'Deployment failed!'
            
            // Show container logs for debugging
            bat 'docker compose logs'
        }
    }
}