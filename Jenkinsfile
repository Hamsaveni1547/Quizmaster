pipeline {
  agent any
  stages {
    stage('Checkout Source Code') { steps { checkout scm } }
    stage('Install Dependencies') { steps { sh 'npm ci || npm install' } }
    stage('Run Tests and Build') { steps { sh 'npm test && npm run build' } }
    stage('Build Docker Image') { steps { sh 'docker build -t quizmaster:${BUILD_NUMBER} -t quizmaster:latest .' } }
    stage('Verify Docker Image') { steps { sh 'docker images quizmaster' } }
  }
}
