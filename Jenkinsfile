pipeline {
    agent any

    environment {
        // Define environment variables
        APP_NAME = 'rickcloudy-front-end'
        AWS_REGION = 'ap-southeast-2'
        AWS_ACCOUNT_URL = '637423465400.dkr.ecr.ap-southeast-2.amazonaws.com'
        AWS_ECR_REPO_URL = '637423465400.dkr.ecr.ap-southeast-2.amazonaws.com/rickcloudy_front_end'
        GIT_SSH_COMMAND = 'ssh -i $SSH_KEY'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout SCM
                checkout scm
            }
        }
        stage('Check for Skip CI') {
            steps {
                script {
                    def commitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                    if (commitMessage.contains('[skip ci]')) {
                        error('Skipping CI build based on commit message.')
                    }
                }
            }
        }

        stage('Setup Tools') {
            steps {
                script {
                    // Check and install AWS CLI
                    if (!sh(script: 'command -v aws', returnStatus: true)) {
                        sh '''
                        echo "AWS CLI not found, installing..."
                        curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
                        unzip awscliv2.zip
                        sudo ./aws/install
                        '''
                    } else {
                        echo "AWS CLI is already installed"
                    }

                    // Check and install Helm
                    if (!sh(script: 'command -v helm', returnStatus: true)) {
                        sh '''
                        echo "Helm not found, installing..."
                        curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
                        '''
                    } else {
                        echo "Helm is already installed"
                    }
                }
            }
        }
        stage('Prepare Version') {
            steps {
                script {

                    if (!fileExists('app_version.txt')) {
                        error "app_version.txt is missing from the repository. Please ensure it is present before proceeding."
                    }
                    if (!fileExists('chart_version.txt')) {
                        error "chart_version.txt is missing from the repository. Please ensure it is present before proceeding."
                    }
                    // Read the current app version
                    def appVersionContent = readFile('app_version.txt').trim()
                    def (appMajor, appMinor, appPatch) = appVersionContent.tokenize('.')
                    
                    // Increment the app patch version
                    int newAppPatch = appPatch.toInteger() + 1
                    
                    // Combine them into the new full app version
                    def newAppVersion = "${appMajor}.${appMinor}.${newAppPatch}"
                    echo "New App Version: ${newAppVersion}"

                    // Read the current chart version
                    def chartVersionContent = readFile('chart_version.txt').trim()
                    def (chartMajor, chartMinor, chartPatch) = chartVersionContent.tokenize('.')
                    // Increment the chart patch version
                    int newChartPatch = chartPatch.toInteger() + 1
                    // Combine them into the new full chart version
                    def newChartVersion = "${chartMajor}.${chartMinor}.${newChartPatch}"
                    echo "New Chart Version: ${newChartVersion}"

                    env.APP_VERSION = newAppVersion
                    env.CHART_VERSION = newChartVersion

                }
            }
        }
        stage('Check Changes in Helm Chart') {
            steps {
                script {
                    def mainBranch = "origin/main"
                    def chartDir = "my_chart" // Store the chart directory as a variable
                    
                    // Check for changes in templates using a more concise command
                    def hasChanges = sh(returnStdout: true, script: "git diff --name-only $mainBranch $chartDir/templates || true").trim()
                    
                    if (hasChanges) {
                        echo "Changes detected in $chartDir/templates: ${hasChanges}"
                        
                        // Change directory to the chart directory (optional)
                        sh "cd $chartDir"

                        // Combine packaging and indexing into a single step
                        sh 'helm package . && helm repo index .'

                        // Use SSH credentials functionality
                        sshagent(['github-ssh-credentials-id']) {
                            sh 'git config user.name "Cloudy Rick"'
                            sh 'git config user.email "cloudyricky.dev@example.com"'
                            sh "git add $hasChanges" // Add only changed files
                            sh 'git commit -m "Update Helm chart with latest changes"'
                            sh 'git remote set-url origin git@github.com:CloudyRick/rickcloudy_front_end_helm_chart.git'
                            sh 'git push origin main' // Adjust 'main' if needed
                        }
                        sh 'cd ..'
                    } else {
                        echo "No changes detected in $chartDir/templates"
                    }
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
        
        // Test stage is skipped or removed

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