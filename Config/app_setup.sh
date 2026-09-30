#!/bin/bash
set -e

EC2_IP=$1
IMAGE_TAG=$2
EC2_USER=ubuntu

# Navigate to the correct directory where docker-compose.yaml is located
mkdir -p /home/ubuntu/chronicle/Config # ensuring dir exists
cd /home/ubuntu/chronicle/Config

# Backup current docker-compose.yaml
if [ -f docker-compose.yaml ]; then
    echo "Backing up current docker-compose.yaml..."
    cp docker-compose.yaml docker-compose.yaml.bkp
fi

rollback() {
    echo "Health check failed! Rolling back to previous version..."
    if [ -f docker-compose.yaml.bkp ]; then
        mv docker-compose.yaml.bkp docker-compose.yaml
        sudo docker compose up -d
        echo "Rollback complete. Restored previous version."
    else
        echo "No backup file found to roll back."
    fi
    exit 1
}

echo "Pulling image..."
if ! sudo docker pull yashashavgoyal/chronicle:$IMAGE_TAG; then
    echo "Failed to pull image. Aborting without modifying containers."
    rm -f docker-compose.yaml.bkp
    exit 1
fi

echo "Updating image tag in docker-compose..."
sudo sed -i "s|image: yashashavgoyal/chronicle:.*|image: yashashavgoyal/chronicle:$IMAGE_TAG|" docker-compose.yaml

echo "Deploying containers..."
if ! sudo docker compose up -d; then
    rollback
fi

echo "Waiting for health check..."
HEALTH_CHECK_PASSED=false
for i in {1..12}; do
    if curl -f http://localhost/health; then
        echo "Health check passed!"
        HEALTH_CHECK_PASSED=true
        break
    fi
    echo "Health check attempt $i/12 failed. Retrying in 5 seconds..."
    sleep 5
done

if [ "$HEALTH_CHECK_PASSED" = true ]; then
    echo "Deployment Successful!"
    rm -f docker-compose.yaml.bkp
    echo "Cleaning up dangling images..."
    sudo docker image prune -f
    exit 0
else
    rollback
fi
