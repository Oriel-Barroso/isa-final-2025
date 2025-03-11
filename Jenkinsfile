#!/usr/bin/env groovy

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

    stage('nohttp') {
        sh './mvnw -ntp checkstyle:check'
    }

    stage('install tools') {
        sh './mvnw -ntp com.github.eirslett:frontend-maven-plugin:install-node-and-npm@install-node-and-npm'
    }

    stage('npm install') {
        withEnv([
            'CYPRESS_CACHE_FOLDER=/var/jenkins_home/.cache/Cypress',
            'npm_config_cache=/var/jenkins_home/.npm'
        ]) {
            // Create cache directories with correct permissions
            sh '''
                mkdir -p /var/jenkins_home/.cache/Cypress
                mkdir -p /var/jenkins_home/.npm
                chmod -R 777 /var/jenkins_home/.cache
                chmod -R 777 /var/jenkins_home/.npm
                ./mvnw -ntp com.github.eirslett:frontend-maven-plugin:npm
            '''
        }
    }

    stage('packaging') {
        sh './mvnw -ntp verify -P-webapp -Pprod -DskipTests'
        archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true
    }

    def dockerImage
    stage('publish docker') {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-login', 
            passwordVariable: 'DOCKER_REGISTRY_PWD', 
            usernameVariable: 'DOCKER_REGISTRY_USER')]) {
            sh './mvnw -ntp jib:build'
        }
    }
}
