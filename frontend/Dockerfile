FROM node:14.16-slim

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm ci

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
ARG PUBLIC_URL
ENV PUBLIC_URL=${PUBLIC_URL}

COPY . .

RUN if [ "${NODE_ENV}" != "development" ]; then \
    npm run build && \
    npm install -g serve; \
    fi

CMD serve -s build -l 3000
