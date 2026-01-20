#!/bin/bash
set -e

EC2_IP=$1
IMAGE_TAG=$2
EC2_USER=ubuntu

# Navigate to the correct directory where docker-compose.yaml is located
mkdir -p /home/ubuntu/chronicle/Config # ensuring dir exists
cd /home/ubuntu/chronicle/Config

echo "Pulling image..."
sudo docker pull yashashavgoyal/chronicle:$IMAGE_TAG

echo "Stopping existing containers..."
sudo docker compose down --rmi all

echo "Updating image tag in docker-compose..."
sudo sed -i "s|image: yashashavgoyal/chronicle:.*|image: yashashavgoyal/chronicle:$IMAGE_TAG|" docker-compose.yaml

echo "Starting containers..."
sudo docker compose up -d

echo "Waiting for health check..."
HEALTH_CHECK_PASSED=false
for i in {1..12}; do
    if curl -f http://localhost/health; then
        echo "Health check passed!"
        HEALTH_CHECK_PASSED=true
        break
    fi
    sleep 5
done

if [ "$HEALTH_CHECK_PASSED" = true ]; then
    echo "Cleaning up unused images..."
    sudo docker image prune -a -f
    echo "Deployment Successful!"
    exit 0
else
    echo "Health check failed"
    exit 1
fi
