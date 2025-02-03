#!/bin/bash

set -x

SECRET_NAME="prod/RickCloudy/FrontEnd"
REGION="ap-southeast-2"

# Fetch the secret value from AWS Secrets Manager
SECRET_VALUE=$(aws secretsmanager get-secret-value --secret-id "$SECRET_NAME" --region "$REGION" --query 'SecretString' --output text 2>/dev/null)

# Check if the secret value was fetched
if [ -z "$SECRET_VALUE" ]; then
  echo "Error: Failed to fetch the secret from AWS Secrets Manager." >&2
  exit 1
fi

# Export environment variables for Spring Boot
export BASE_URL=$(echo $SECRET_VALUE | jq -r .VITE_BASE_API_URL)

IMAGE_NAME=rickcloudy-fe-dev
CONTAINER_NAME="rickcloudy-fe-dev"
HOST_PORT=3000
CONTAINER_PORT=80

docker build -t $IMAGE_NAME .

# Check if the container is already running
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "Stopping and removing existing container: $CONTAINER_NAME..."
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

# Run the Docker container
echo "Starting Docker container: $CONTAINER_NAME..."
docker run -d -e VITE_BASE_API_URL=$BASE_URL --name $CONTAINER_NAME -p $HOST_PORT:$CONTAINER_PORT $IMAGE_NAME

echo "Frontend is running at port $HOST_PORT"
