WORK_PROJECT_PATH=$(node -e "console.log(require('path').resolve(__dirname))")

sudo docker build -t ubicar-api-dev -f ./dockerfiles/dev.dockerfile $WORK_PROJECT_PATH

sudo docker compose -f ./dockerfiles/docker-compose-dev.yml up -d