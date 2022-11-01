echo "Levantando API en modo desarrollo..."

# Lifting API
WORK_PROJECT_PATH=$(node -e "console.log(require('path').resolve(__dirname))")
docker build -t ubicar-api-dev -f ./dockerfiles/dev.dockerfile $WORK_PROJECT_PATH
docker compose -f ./dockerfiles/docker-compose-dev.yml up -d

echo "Ejecutando tests..."

WORK_PROJECT_PATH=$(node -e "console.log(require('path').resolve(__dirname))")
NODE_VERSION=$(node -e "console.log(require('${WORK_PROJECT_PATH}/package.json').node_version)")

# Exec tests in docker
docker build -t ubicar-test-app --build-arg TAG=$NODE_VERSION -f ./dockerfiles/test.dockerfile $WORK_PROJECT_PATH
docker run -it --name test-container --network dockerfiles_default --link ubicar_api_dev ubicar-test-app

echo "Tests finalizados."

# Limpieza conteiners e imagenes
docker rm test-container database ubicar_api_dev -f
docker rmi $(docker images | tail -n +2 | awk '$1 == "<none>" {print $'3'}')