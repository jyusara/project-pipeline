pipeline {
    agent any

    environment {
        IMAGE_NAME = "shopimax-apiv2"
        DOCKER_COMPOSE_FILE = "docker-compose.yml"
        PORT = "3002"
        BUILD_ID = "${env.BUILD_ID}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/RodrigoChumpitaz/project-pipeline.git'
            }
        }

        stage('Limpieza Previa') {
            steps {
                // Elimina el contenedor de Mongo en caso de que exista para evitar conflictos.
                sh 'docker rm -f shopimax-dbv2 || true'
            }
        }

        stage('Build') {
            steps {
                sh 'docker-compose build --no-cache'
            }
        }

        stage('Run Services') {
            steps {
                sh """
                  export BUILD_ID=${BUILD_ID}
                  docker-compose up -d --build
                """
            }
        }

        // stage('Test') {
        //     steps {
        //         sh 'docker-compose exec shopimax-apiv2 yarn test'
        //     }
        // }
        
    }

    post {
        always {
             echo "Ejecutando limpieza: Deteniendo y eliminando contenedores, imágenes y demás recursos..."
            // Detiene y elimina los contenedores definidos en el archivo docker-compose
            sh 'docker-compose down'
            // Elimina contenedores detenidos
            sh 'docker container prune -f'
            // Elimina imágenes que no están en uso (dangling images)
            sh 'docker image prune -af'
            // Opcional: eliminar redes y volúmenes huérfanos
            // sh 'docker network prune -f'
            // sh 'docker volume prune -f'
        }
    }
        
    
}