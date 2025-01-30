pipeline {
    agent any

    environment {
        // Define environment variables
        APP_NAME = 'rickcloudy-front-end'
        AWS_REGION = 'ap-southeast-2'
        AWS_ACCOUNT_URL = '637423465400.dkr.ecr.ap-southeast-2.amazonaws.com'
        AWS_ECR_REPO_URL = '637423465400.dkr.ecr.ap-southeast-2.amazonaws.com/rickcloudy_front_end'
        IMAGE_NAME = 'rickcloudy-fe-prod'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout SCM
                checkout scm
            }
        }

        stage('Prepare Version') {
            steps {
                script {
                    if (!fileExists('app_version.txt')) {
                        error "app_version.txt is missing from the repository. Please ensure it is present before proceeding."
                    }
                    // Read the current app version
                    def appVersionContent = readFile('app_version.txt').trim()
                    def (appMajor, appMinor, appPatch) = appVersionContent.tokenize('.')
                    
                    // Increment the app patch version
                    int newAppPatch = appPatch.toInteger() + 1
                    
                    // Combine them into the new full app version
                    def newAppVersion = "${appMajor}.${appMinor}.${newAppPatch}"
                    echo "New App Version: ${newAppVersion}"

                    env.APP_VERSION = newAppVersion
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker Image...'
                script {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'jenkins-job-rickcloudy']]) {
                        sh '''
                            echo "Logging into AWS ECR..."
                            aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_URL
                            docker build -t $IMAGE_NAME .
                            echo "Tagging and pushing versioned image..."
                             echo "Tagging Docker Image..."
                            docker tag $IMAGE_NAME $AWS_ECR_REPO_URL:$APP_VERSION
                            docker tag $IMAGE_NAME $AWS_ECR_REPO_URL:latest

                            echo "Pushing Docker Image..."
                            docker push $AWS_ECR_REPO_URL:$APP_VERSION
                            docker push $AWS_ECR_REPO_URL:latest
                            
                            echo "Versioned and latest image pushed successfully!"
                        '''
                    }
                }
            }
        }

        stage('Copy Deploy Script into Application Server') {
            steps {
                script {
                    echo "Copying script into remote server..."

                    sshagent(['jenkins-agent']) {
                        sh '''
                            echo 'Logged into remote server'
                            scp start-frontend-prod.sh jenkins-agent@rickcloudy.com:/home/jenkins-agent/
                            ssh jenkins-agent@rickcloudy.com cd /home/jenkins-agent ls
                        '''
                    }
                }
            }
        }


        stage('Deploy') {
            steps {
                script {
                    echo "SSH into remote server and pull the image from ECR..."

                    // Use sshagent to authenticate using SSH credentials stored in Jenkins
                    sshagent(['jenkins-agent']) {  // Replace with your actual SSH credentials ID
                        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'jenkins-job-rickcloudy']]) {
                            sh '''
                                ssh jenkins-agent@rickcloudy.com
                                echo 'Logged into remote server'

                                # Authenticate Docker to ECR
                                aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_URL}

                                # Pull the image from ECR
                                docker pull ${AWS_ECR_REPO_URL}:latest
                                docker images
                                cd /home/jenkins-agent
                                ls
                                 ssh jenkins-agent@rickcloudy.com ./home/jenkins-agent/start-frontend-prod.sh
                            '''
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            // Actions to always perform after stages
            echo 'Cleaning up...'
            deleteDir() // Cleans up the workspace
        }
        success {
            // Actions to perform if pipeline is successful
            echo 'Build succeeded!'
            steps {
                script {
                    // Configure Git with user and email
                    sh 'git config user.name "Anak Anjing"'
                    sh 'git config user.email "your.email@example.com"'
                    // Add version.txt
                    sh 'git add app_version.txt'
                    // Commit with a message to skip CI
                    sh 'git commit -m "Update app_version.txt [skip ci]"'
                    // Push changes
                }
            }
        }
        failure {
            script {
                // Rollback actions here
                echo "A stage failed. Performing rollback..."
                // Example: Remove the Docker image if the build was successful but later stages failed
                sh "docker rmi -f ${env.APP_NAME}:${env.APP_VERSION}"
                echo "Rollback completed. Removed Docker image ${env.APP_NAME}:${env.APP_VERSION}."
            }
        }
    }
}
