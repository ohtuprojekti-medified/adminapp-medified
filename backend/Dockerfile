FROM node:14.15-alpine

WORKDIR /usr/src/app

RUN chown -R node:node /usr/src/app
USER node

COPY package.json .
COPY package-lock.json .

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm ci

COPY . .

CMD npm start
