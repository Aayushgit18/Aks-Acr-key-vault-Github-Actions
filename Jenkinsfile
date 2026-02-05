@Library('company-shared-lib') _

pipeline {
    agent any

    environment {
        // ---------- Azure / AKS ----------
        ACR_NAME        = credentials('ACR_NAME')
        ACR_LOGIN       = credentials('ACR_LOGIN_SERVER')
        AKS_NAME        = credentials('AKS_NAME')
        AKS_RG          = credentials('AKS_RG')

        // ---------- Kubernetes ----------
        K8S_NAMESPACE   = 'default'

        // ---------- Build Caching ----------
        GRADLE_USER_HOME = "${WORKSPACE}/.gradle"
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
    }

    stages {

        stage('Backend Build & Unit Test') {
            steps {
                springBootPipeline(
                    appPath: 'SpringCRUD'
                )
            }
        }

        stage('Frontend Build & Test') {
            steps {
                angularPipeline(
                    appPath: 'AngularCRUD'
                )
            }
        }

        stage('Docker Build - Backend') {
            steps {
                script {
                    BACKEND_IMAGE = dockerBuild(
                        appName: 'spring-crud',
                        dockerfilePath: 'SpringCRUD/Dockerfile',
                        context: 'SpringCRUD'
                    )
                }
            }
        }

        stage('Docker Build - Frontend') {
            steps {
                script {
                    FRONTEND_IMAGE = dockerBuild(
                        appName: 'angular-crud',
                        dockerfilePath: 'AngularCRUD/Dockerfile',
                        context: 'AngularCRUD'
                    )
                }
            }
        }

        stage('Trivy Scan Images') {
            steps {
                trivyScan(image: BACKEND_IMAGE)
                trivyScan(image: FRONTEND_IMAGE)
            }
        }

        stage('Azure Login') {
            steps {
                azureLogin()
            }
        }

        stage('Push Images to ACR') {
            steps {
                dockerPush(image: BACKEND_IMAGE, acrName: env.ACR_NAME)
                dockerPush(image: FRONTEND_IMAGE, acrName: env.ACR_NAME)
            }
        }

        stage('AKS Login') {
            steps {
                aksLogin()
            }
        }

        stage('Helm Lint & Template') {
            steps {
                helmValidate(chartPath: 'helm/umbrella')
            }
        }

        stage('Deploy to AKS') {
            steps {
                helmDeploy(
                    release: 'three-tier-app',
                    chartPath: 'helm/umbrella',
                    namespace: env.K8S_NAMESPACE
                )
            }
        }

        stage('Post Deployment Verification') {
            steps {
                postDeployCheck(
                    deployment: 'spring-crud',
                    namespace: env.K8S_NAMESPACE
                )
            }
        }
    }
}
