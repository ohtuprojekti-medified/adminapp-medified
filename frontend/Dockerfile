FROM node:14

WORKDIR /usr/src/app
RUN chown -R node:node /usr/src/app

<<<<<<< HEAD
COPY ["package.json", "package-lock.json*", "./"]
=======
COPY package.json .
COPY package-lock.json .
>>>>>>> 84333b58712b246c980ff1e60af8a1d2ec23fc9d
RUN npm ci

COPY . .

EXPOSE 3000

USER node

CMD ["npm", "start"]