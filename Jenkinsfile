def builderDocker

pipeline {

    agent any

    parameters {
        booleanParam(name: 'RUNTEST', defaultValue: true, description: 'Toggle this value from testing')
        choice(name: 'CICD', choices: ['CI', 'CICD Deployment', 'CICD Production'], description: 'Pick something')
    }

    stages {

        stage('Build Project') {
            steps {
                nodejs("node12") {
                    sh 'npm install'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    builderDocker = docker.build("123160087/express-app:dev")
                }
            }
        }

        stage('Run Testing') {
            when {
                expression {
                    params.RUNTEST
                }
            }
            steps {
                script {
                    builderDocker.inside {
                        sh 'echo passed'
                    }
                }
            }
        }

        stage('Push Image') {
            when {
                expression {
                    params.RUNTEST
                }
            }
            steps {
                
                script {
                    builderDocker.push("${env.GIT_BRANCH}")
                }
            }
        }

        stage('Deploy on development') {
            when {
                expression {
                    params.CICD == 'CICD Development' || BRANCH_NAME == 'dev'
                }
            }
            steps {
                script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'dev-user',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: 'docker-compose.yaml',
                                        remoteDirectory: 'express-app',
                                        execCommand: 'cd express-app && docker-compose up -d',
                                        execTimeout: 120000,
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
        stage('Deploy on production') {
            when {
                expression {
                    params.CICD == 'CICD Production' || BRANCH_NAME == 'prod'
                }
            }
            steps {
                script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'prod-user',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: 'docker-compose.yaml',
                                        remoteDirectory: 'express-app',
                                        execCommand: 'cd express-app && docker-compose up -d',
                                        execTimeout: 120000,
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
    }
}