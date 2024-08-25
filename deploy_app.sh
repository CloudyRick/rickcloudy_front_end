#!/bin/bash

# Variables (replace these with your actual values)
HELM_RELEASE_NAME="rickcloudy_front_end_release"
HELM_REPO_NAME="rickcloudy-front-end"
HELM_REPO_URL="git@github.com:CloudyRick/rickcloudy_front_end_helm_chart.git"
HELM_CHART_NAME="rickcloudy-front-end"
NAMESPACE="rickcloudy_frontend"
VALUES_FILE="./values.yaml"
IMAGE_TAG="latest"

# Check if Helm is installed
if ! command -v helm &> /dev/null
then
    echo "Helm not found, please install Helm before running this script."
    exit 1
fi

# Authenticate Docker with AWS ECR
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_URL

# Pull the Docker image from ECR
docker pull $AWS_ECR_REPO_URL:$IMAGE_TAG

# Add Helm repository
helm repo add $HELM_REPO_NAME $HELM_REPO_URL
# Update Helm repository
helm repo update

# Deploy using Helm
echo "Deploying Helm chart..."
helm upgrade --install $HELM_RELEASE_NAME $HELM_REPO_NAME/$HELM_CHART_NAME --namespace $NAMESPACE -f $VALUES_FILE

echo "Deployment completed successfully."