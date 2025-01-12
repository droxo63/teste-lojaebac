pipeline {
    agent any

    stages {
        stage('Clonando repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/droxo63/teste-lojaebac.git'
            }
        }
                stage('Configuração') {
            steps {
               bat '''npm install
'''
            }
        }
                    stage('Testes') {
            steps {
               bat '''set NO_COLOR=1
npm test
'''
            }
        }
    }
}
