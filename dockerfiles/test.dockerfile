ARG TAG

FROM node:$TAG

WORKDIR /usr/src/app

COPY package.json .

RUN npm install
RUN npm install --save-dev jest

COPY . .

CMD [ "npm", "run", "jest" ]