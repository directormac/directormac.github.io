#!/bin/bash

# Read the package.json
PACKAGE=$(cat package.json)
# The jq command parses the JSON data and extracts the values of "name" and "version".
# The -r flag is used to output the values without quotes.
IMAGE_NAME=$(echo "$PACKAGE" | jq -r '.name')
VERSION=$(echo "$PACKAGE" | jq -r '.verion')

# For customization uncomment the following lines this will override the variables above
# Where IMAGE_NAME now will be your directory name and version should be latest
# IMAGE_NAME=$(basename $PWD)
# VERSION="latest"

# Build image
docker build -t "$IMAGE_NAME:$VERSION" .

# Stop and remove any existing container using the same image
docker stop "$IMAGE_NAME" || true
docker rm "$IMAGE_NAME" || true

# Run new container using the updated image
docker run -d -p 8001:8001 --name "$IMAGE_NAME" --restart=always "$IMAGE_NAME:$VERSION"
