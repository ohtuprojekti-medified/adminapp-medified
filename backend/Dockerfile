FROM node:14.16-slim

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm ci

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY . .

CMD npm start
