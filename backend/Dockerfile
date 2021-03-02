FROM node:14.15-alpine

WORKDIR /usr/src/app

RUN chown -R node:node /usr/src/app
USER node

COPY package.json .
COPY package-lock.json .

RUN npm ci

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY . .

# EXPOSE 5000
CMD npm start
