FROM node:20-alpine

RUN mkdir /home/node/app

WORKDIR /home/node/app

RUN apk add --no-cache bash

COPY package.json package-lock.json tsconfig.json .env ./
COPY prisma/ prisma/

RUN npm install

COPY src/ src/
