
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
