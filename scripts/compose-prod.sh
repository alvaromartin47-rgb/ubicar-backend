WORK_PROJECT_PATH=$(node -e "console.log(require('path').resolve(__dirname))")

docker build -t ubicar-api-production -f ./Dockerfile $WORK_PROJECT_PATH

docker compose up -d