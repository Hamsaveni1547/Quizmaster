
pipeline {
    agent any

    stages {

        stage('Checkout Source Code') {
            steps {
                echo 'Source code checked out from GitHub'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }

        stage('Build Application') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat '"C:\\Users\\harish\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" build -t quizmaster .'
            }
        }

        stage('Verify Docker Image') {
            steps {
                bat '"C:\\Users\\harish\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" images quizmaster'
            }
        }
    }
}
