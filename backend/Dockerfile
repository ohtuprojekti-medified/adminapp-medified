FROM node:14

WORKDIR /usr/src/app
RUN chown -R node:node /usr/src/app

COPY package.json .
COPY package-lock.json .

USER node

RUN npm ci

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --chown=node:node . .

EXPOSE 5000
CMD npm start
