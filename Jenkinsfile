pipeline {
    agent any

    environment {
        APP_NAME = "micro-app"
        IMAGE_NAME = "micro-app-local"
        NEXUS_URL = "192.168.1.122:8081"
        NEXUS_REPO = "docker-hosted"
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
                withCredentials([usernamePassword(credentialsId: 'nexus-credentials', usernameVariable: 'NEXUS_USERNAME', passwordVariable: 'NEXUS_PASSWORD')]) {
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
}
