FROM node:14.15-alpine

WORKDIR /usr/src/app

RUN chown -R node:node /usr/src/app

COPY package.json .
COPY package-lock.json .

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
# ARG API_URL
# ENV API_URL=${API_URL}

RUN npm ci

COPY . .

RUN if [ "${NODE_ENV}" != "development" ]; then \
    npm run build && \
    npm install -g serve; \
    fi

USER node

CMD serve -s build -l 3000
