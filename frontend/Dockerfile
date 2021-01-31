FROM node:14

WORKDIR /usr/local/app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]