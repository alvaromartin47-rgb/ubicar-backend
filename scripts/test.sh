
echo "Ejecutando tests..."

WORK_PROJECT_PATH=$(node -e "console.log(require('path').resolve(__dirname))")
NODE_VERSION=$(node -e "console.log(require('${WORK_PROJECT_PATH}/package.json').node_version)")

docker build -t ubicar-test-app --build-arg TAG=$NODE_VERSION -f ./dockerfiles/test.dockerfile $WORK_PROJECT_PATH

docker run -it --name test-container node-test-app

echo "Tests finalizados."

# Limpieza conteiners e imagenes
docker rm test-container -f
docker rmi $(docker images | tail -n +2 | awk '$1 == "<none>" {print $'3'}')