FROM node:14

WORKDIR /usr/src/app
RUN chown -R node:node /usr/src/app

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .

EXPOSE 3000

USER node

CMD ["npm", "start"]