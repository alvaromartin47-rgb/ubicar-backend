FROM node:alpine

WORKDIR /usr/src/app

RUN npm install mongoose
RUN npm install @babel/preset-env
RUN npm install -g @babel/node
RUN npm install -g @babel/core
RUN npm install -g @babel/cli
RUN npm install -g @babel/register
RUN npm install jsonwebtoken
RUN npm install dotenv
RUN npm install axios

RUN apk add bash
RUN apk add nano

COPY src/services/ .
COPY .env .
COPY src/controllers/entities/Token.ts ./checkExpiration/

CMD [ "bash", "checkExpiration/sleep.sh" ]