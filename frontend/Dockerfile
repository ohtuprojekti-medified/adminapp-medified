FROM node:14.15-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm ci

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
# ARG API_URL
# ENV API_URL=${API_URL}

COPY . .

RUN if [ "${NODE_ENV}" != "development" ]; then \
    npm run build && \
    npm install -g serve; \
    fi


CMD serve -s build -l 3000
