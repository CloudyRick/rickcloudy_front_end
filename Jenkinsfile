pipeline {
    agent any

    environment {
        APP_NAME = 'rickcloudy-front-end'
        AWS_REGION = 'ap-southeast-2'
        AWS_ACCOUNT_URL = '637423465400.dkr.ecr.ap-southeast-2.amazonaws.com'
        AWS_ECR_REPO_URL = '637423465400.dkr.ecr.ap-southeast-2.amazonaws.com/rickcloudy_front_end'
        IMAGE_NAME = 'rickcloudy-fe-prod'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Skip CI') {
            steps {
                script {
                    def commitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                    if (commitMessage.contains('[skip ci]')) {
                        echo 'Skipping CI as per commit message.'
                        currentBuild.result = 'SUCCESS'
                        error('Skipping further stages.')
                    }
                }
            }
        }

        stage('Prepare Version') {
            steps {
                script {
                    if (!fileExists('app_version.txt')) {
                        error "app_version.txt is missing from the repository."
                    }
                    
                    // Read the current app version
                    def appVersionContent = readFile('app_version.txt').trim()
                    def versionParts = appVersionContent.tokenize('.')
                    
                    if (versionParts.size() != 3) {
                        error "Invalid version format in app_version.txt. Expected format: X.Y.Z"
                    }

                    // Increment patch version
                    int newAppPatch = versionParts[2].toInteger() + 1
                    def newAppVersion = "${versionParts[0]}.${versionParts[1]}.${newAppPatch}"

                    echo "New App Version: ${newAppVersion}"
                    writeFile file: 'app_version.txt', text: newAppVersion
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
                            
                            echo "Tagging and pushing image..."
                            docker tag $IMAGE_NAME $AWS_ECR_REPO_URL:$APP_VERSION
                            docker tag $IMAGE_NAME $AWS_ECR_REPO_URL:latest
                            docker push $AWS_ECR_REPO_URL:$APP_VERSION
                            docker push $AWS_ECR_REPO_URL:latest
                        '''
                    }
                }
            }
        }

        stage('Copy Deploy Script into Application Server') {
            steps {
                script {
                    echo "Copying deployment script to remote server..."
                    sshagent(['jenkins-agent']) {
                        sh '''
                            scp start-frontend-prod.sh jenkins-agent@rickcloudy.com:/home/jenkins-agent/
                        '''
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo "Deploying on remote server..."
                    sshagent(['jenkins-agent']) {
                        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'jenkins-job-rickcloudy']]) {
                            sh '''
                                ssh jenkins-agent@rickcloudy.com "echo 'Logged into remote server' && aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_URL} && docker pull ${AWS_ECR_REPO_URL}:latest && bash /home/jenkins-agent/start-frontend-prod.sh"
                            '''
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            deleteDir()
        }
        success {
            echo 'Build and deployment succeeded!'
            script {
                sh '''
                    git config user.name "CloudyRick"
                    git config user.email "cloudyricky.dev@gmail.com"
                    git add app_version.txt
                    git commit -m "Update app_version.txt [skip ci]"
                    git push origin main
                '''
            }
        }
        failure {
            echo "Deployment failed. Rolling back..."
            script {
                sh "docker rmi -f ${AWS_ECR_REPO_URL}:${APP_VERSION}"
            }
        }
    }
}
