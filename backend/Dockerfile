FROM node:14.15-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm ci

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY . .

RUN chown -R node:node /usr/src/app
USER node

# EXPOSE 5000
CMD npm start
