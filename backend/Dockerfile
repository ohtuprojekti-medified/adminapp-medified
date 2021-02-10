FROM node:14

WORKDIR /usr/src/app
RUN chown -R node:node /usr/src/app

USER node
CMD npm start

COPY package.json .
COPY package-lock.json .
RUN npm ci

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY . .

EXPOSE 3000
