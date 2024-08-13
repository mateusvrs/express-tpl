FROM node:20-alpine as base

ENV FORCE_COLOR=1

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

RUN apk update && apk upgrade && apk add --no-cache bash

COPY ../package.json ../package-lock.json ../tsconfig.json ../.env ../eslint.config.mjs ./
COPY ../prisma/ prisma/

RUN npm install

COPY ../src/ src/

ENTRYPOINT ["/home/node/app/src/config/entrypoint.sh"]

FROM base as test

COPY ../jest.config.ts ./
COPY ../tests/ tests/
