WORK_PROJECT_PATH=$(node -e "console.log(require('path').resolve(__dirname))")

docker build -t ubicar-api-dev -f ./docker/dev/Dockerfile $WORK_PROJECT_PATH
docker build -t ubicar-check-expiration -f ./docker/checkExpiration.dockerfile $WORK_PROJECT_PATH

docker compose --project-directory ./ -f ./docker/dev/docker-compose.yml up -d