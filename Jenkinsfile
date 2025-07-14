pipeline {
    agent any

    environment {
        NEXUS_URL = "192.168.1.140:5000"
        NEXUS_REPO = "docker-images"
        SONARQUBE_ENV = 'sonarqube-server'
    }

    stages {
        stage('Checkout code') {
            steps {
                git 'https://github.com/gharbijihen/micro-app.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withCredentials([string(credentialsId: 'jenkins-sonarqube-token', variable: 'SONAR_TOKEN')]) {
                    sh """
                        echo "Running sonar scanner..."
                        npx sonar-scanner -X \
                            -Dsonar.projectKey=payments \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=http://localhost:9000 \
                            -Dsonar.login=${SONAR_TOKEN}
                    """
                }
            }
        }

        stage('Build, Scan & Push Microservices') {
            steps {
                script {
                    def services = ["auth", "client", "expiration", "orders", "payments", "tickets"]
                    sh "mkdir -p trivy-reports"

                    for (service in services) {
                        def imageName = "${NEXUS_URL}/${NEXUS_REPO}/${service}:latest"
                        def servicePath = "${service}"
                        echo "Building image for ${service}..."

                        // Build Docker image
                        sh "docker build -t ${imageName} ${servicePath}"

                        // Trivy Scan
                        echo "Scanning image ${imageName} with Trivy..."
                        sh """
                            trivy image --severity HIGH,CRITICAL --no-progress \
                                --format table \
                                --output trivy-reports/${service}_report.txt \
                                ${imageName}
                        """
                        sh "cat trivy-reports/${service}_report.txt"

                        // Push to Nexus
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
    }

    post {
        always {
            archiveArtifacts artifacts: 'trivy-reports/*.txt', fingerprint: true
        }
    }
}
