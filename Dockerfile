FROM node:16.3.1

WORKDIR /code

COPY package.json package-lock.json ./
RUN npm install
