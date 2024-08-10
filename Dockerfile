FROM node:20-alpine

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

RUN apk update && apk upgrade && apk add --no-cache bash

COPY package.json package-lock.json tsconfig.json .env ./
COPY prisma/ prisma/

RUN npm install

COPY src/ src/

ENTRYPOINT ["/home/node/app/src/config/entrypoint.sh"]