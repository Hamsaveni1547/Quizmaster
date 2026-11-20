#!/bin/bash
set -e
docker build -t quizmaster:latest . || { echo "Build failed"; exit 1; }
echo "Build OK"; docker images quizmaster
docker rm -f quizmaster 2>/dev/null || true
docker run -d --name quizmaster -p 8080:80 quizmaster:latest
echo "Running at http://localhost:8080"
