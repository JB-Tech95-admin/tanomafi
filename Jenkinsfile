pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Herilanto003/site-vitrine-environnement.git'
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
                sh 'docker build -t my-site:latest .'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Simulating deployment...'
                sh 'docker run -d -p 80:80 --name my-site my-site'
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
