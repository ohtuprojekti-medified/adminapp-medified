FROM node:14

WORKDIR /usr/local/app

#COPY ["package.json", "package-lock.json*", "./"]
COPY package.json .
COPY package-lock.json* .
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]