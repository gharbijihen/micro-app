pipeline {
    agent any

    environment {
        NEXUS_URL = "192.168.1.122:5000"
        NEXUS_REPO = "docker-images"
        SONARQUBE_ENV = 'sonarqube-server' // Nom du serveur Sonar dans Jenkins
    }

    stages {
        stage('Checkout code') {
            steps {
                git 'https://github.com/gharbijihen/micro-app.git'
            }
        }

        stage('Build & Push Microservices') {
            steps {
                script {
                    def services = ["auth", "client", "expiration", "orders", "payments", "tickets"]

                    for (service in services) {
                        def imageName = "${NEXUS_URL}/${NEXUS_REPO}/${service}:latest"
                        def servicePath = "${service}"

                        echo "Building and pushing image for ${service}..."

                        sh """
                            docker build -t ${imageName} ${servicePath}
                        """

                        withCredentials([usernamePassword(credentialsId: 'nexus-credentials', usernameVariable: 'NEXUS_USERNAME', passwordVariable: 'NEXUS_PASSWORD')]) {
                            sh """
                                echo \$NEXUS_PASSWORD | docker login ${NEXUS_URL} -u \$NEXUS_USERNAME --password-stdin
                                docker push ${imageName}
                                docker logout ${NEXUS_URL}
                            """
                        }
                    }
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    withSonarQubeEnv("${SONARQUBE_ENV}") {
                        withCredentials([string(credentialsId: 'jenkins-sonarqube-token', variable: 'SONAR_TOKEN')]) {
                            sh """
                                sonar-scanner \
                                  -Dsonar.login=$SONAR_TOKEN
                            """
                        }
                    }
                }
            }
        }
    } 
}
