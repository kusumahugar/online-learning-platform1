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
        sh 'docker compose build --pull'
      }
    }

    stage('Start Containers') {
      steps {
        sh 'docker compose up -d'
      }
    }

    stage('Verify containers are running') {
      steps {
        sh 'docker compose ps'
        sh 'docker ps --filter "name=online-learning-platform_backend" --filter "status=running"'
        sh 'curl -f http://localhost:5000 || exit 1'
      }
    }
  }

  post {
    always {
      sh 'docker compose down'
    }
  }
}
