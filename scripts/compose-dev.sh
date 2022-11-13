WORK_PROJECT_PATH=$(node -e "console.log(require('path').resolve(__dirname))")

docker build -t ubicar-api-dev -f ./dockerfiles/dev.dockerfile $WORK_PROJECT_PATH
docker build -t ubicar-check-expiration -f ./dockerfiles/checkExpiration.dockerfile $WORK_PROJECT_PATH

docker compose -f ./dockerfiles/docker-compose-dev.yml up -d