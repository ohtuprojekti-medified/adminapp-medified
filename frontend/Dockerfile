FROM node:14

WORKDIR /usr/src/app
RUN chown -R node:node /usr/src/app

EXPOSE 5000

CMD sh -c "\
    npm run build && \
    npm install -g serve && \
    serve build -l 3000"

COPY package.json .
COPY package-lock.json .
RUN npm ci

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
# ARG API_URL
# ENV API_URL=${API_URL}

COPY . .

USER node
