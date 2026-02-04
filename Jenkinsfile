@Library('company-shared-lib') _

pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                springBootPipeline(
                    appName: 'spring-crud',
                    appPath: 'SpringCRUD'
                )
            }
        }

        stage('Docker Image') {
            steps {
                script {
                    dockerBuild(
                        appName: 'spring-crud',
                        dockerfilePath: 'SpringCRUD/Dockerfile',
                        context: 'SpringCRUD'
                    )
                }
            }
        }
    }
}
