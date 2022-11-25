WORK_PROJECT_PATH=$(node -e "console.log(require('path').resolve(__dirname))")

DOCKER_BUILDKIT=1 docker build -t ubicar-api-production -f ./docker/prod/Dockerfile $WORK_PROJECT_PATH

docker compose --project-directory ./ -f ./docker/prod/docker-compose.yml up -d