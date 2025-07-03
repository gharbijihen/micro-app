pipeline {
    agent any

    environment {
        APP_NAME = "micro-app"
        IMAGE_NAME = "micro-app-local"
        NEXUS_URL = "localhost:8082"
        NEXUS_REPO = "docker-hosted"
        NEXUS_USERNAME = credentials('admin')  // Jenkins credential ID for Nexus username
        NEXUS_PASSWORD = credentials('root')  // Jenkins credential ID for Nexus password
    }

    stages {
        stage('Checkout code') {
            steps {
                git 'https://github.com/gharbijihen/micro-app.git'
            }
        }

        stage('Docker Build (local only)') {
            steps {
                sh "docker build -t $IMAGE_NAME ."
            }
        }

        stage('Tag and Push to Nexus') {
            steps {
                script {
                    def imageTag = "${NEXUS_URL}/${NEXUS_REPO}/${APP_NAME}:latest"

                    sh """
                        docker tag $IMAGE_NAME $imageTag
                        echo $NEXUS_PASSWORD | docker login $NEXUS_URL -u $NEXUS_USERNAME --password-stdin
                        docker push $imageTag
                        docker logout $NEXUS_URL
                    """
                }
            }
        }
    }
}
