pipeline {
    agent any

    environment {
        APP_NAME = "micro-app"
        IMAGE_NAME = "micro-app-local"
    }

    stages {
        stage('Checkout code') {
            steps {
                git 'https://github.com/gharbijihen/micro-app.git'
            }
        }

     

        stage('Build TypeScript') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Docker Build (local only)') {
            steps {
                sh "docker build -t $IMAGE_NAME ."
            }
        }

       
    }
}
