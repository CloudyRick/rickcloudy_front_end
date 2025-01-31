#!/bin/bash

IMAGE_NAME=
CONTAINER_NAME="rickcloudy-fe-prod"
HOST_PORT=3000
CONTAINER_PORT=80

echo "Pulling docker image from ECR: $IMAGE_NAME..."

# Check if the container is already running
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "Stopping and removing existing container: $CONTAINER_NAME..."
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

# Run the Docker container
echo "Starting Docker container: $CONTAINER_NAME..."
docker run -d --name $CONTAINER_NAME -p $HOST_PORT:$CONTAINER_PORT $AWS_ECR_REPO_URL:latest

echo "Frontend is running at port $HOST_PORT"
