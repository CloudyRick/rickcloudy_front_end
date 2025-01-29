pipeline {
    agent any

    environment {
        // Define environment variables
        APP_NAME = 'rickcloudy-front-end'
        AWS_REGION = 'ap-southeast-2'
        AWS_ACCOUNT_URL = '637423465400.dkr.ecr.ap-southeast-2.amazonaws.com'
        AWS_ECR_REPO_URL = '637423465400.dkr.ecr.ap-southeast-2.amazonaws.com/rickcloudy_front_end'
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
                    docker.withRegistry("https://${env.AWS_ECR_REPO_URL}", 'aws-cloudyrick-jenkins') {
                        def image = docker.build("${env.AWS_ECR_REPO_URL}:${env.APP_VERSION}")
                        echo "Docker image ${env.AWS_ECR_REPO_URL}:${env.APP_VERSION} built successfully!"
                    }
                }
            }
        }

        stage('Push Docker Image to AWS ECR') {
            steps {
                echo 'Pushing Docker Image to AWS ECR...'
                script {
                    docker.withRegistry("https://${env.AWS_ECR_REPO_URL}", 'aws-cloudyrick-jenkins') {
                        def image = docker.image("${env.AWS_ECR_REPO_URL}:${env.APP_VERSION}")
                        image.push()
                        echo "Docker image ${env.AWS_ECR_REPO_URL}:${env.APP_VERSION} pushed successfully!"

                        // Tag the image with 'latest' and push
                        image.push('latest')
                        echo "Docker image ${env.AWS_ECR_REPO_URL}:latest pushed successfully!"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'github_cred', keyFileVariable: 'SSH_KEY')]) {
                    sh '''
                    export GIT_SSH_COMMAND="ssh -i $SSH_KEY"
                    ./deploy_app.sh
                    '''
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
                    sh 'git config user.name "Your Name"'
                    sh 'git config user.email "your.email@example.com"'
                    // Add version.txt
                    sh 'git add app_version.txt'
                    // Commit with a message to skip CI
                    sh 'git commit -m "Update app_version.txt [skip ci]"'
                    // Push changes
                    sh 'git push'
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
