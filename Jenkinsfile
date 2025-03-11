node {
    stage('checkout') {
        checkout scm
    }

    stage('check java') {
        sh 'java -version'
    }

    stage('clean') {
        sh 'chmod +x mvnw'
        sh './mvnw -ntp clean -P-webapp'
    }

    stage('compile') {
        sh './mvnw -ntp compile -P-webapp'
    }


    stage('publish docker') {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-login', 
            passwordVariable: 'DOCKER_REGISTRY_PWD', 
            usernameVariable: 'DOCKER_REGISTRY_USER')]) {
            sh './mvnw -ntp compile jib:build'
        }
    }
}