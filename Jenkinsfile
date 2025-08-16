pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/JB-Tech95-admin/tanomafi.git'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Installing dependencies...'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t tanomafi:latest .'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Simulating deployment...'
                sh 'docker run -d -p 3000:80 --name tanomafi tanomafi'
                sh 'echo Deploy done'
            }
        }
    }

    post {
        success {
            echo '🎉 Pipeline succeeded!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
}
