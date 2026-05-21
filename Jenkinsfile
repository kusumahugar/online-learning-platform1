pipeline {
    agent any

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

                bat 'docker compose ps'
                bat 'docker ps'

                // Jenkins-safe wait
                sleep(time: 15, unit: 'SECONDS')

                bat 'docker compose ps'
            }
        }
    }

    post {

        success {
            echo 'Deployment successful!'
        }

        failure {
            echo 'Deployment failed!'
            bat 'docker compose logs'
        }

        always {
            bat 'docker ps'
        }
    }
}