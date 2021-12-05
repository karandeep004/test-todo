FROM node:14-alpine

WORKDIR /app

RUN mom i -g postcss tailwindcss

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .
