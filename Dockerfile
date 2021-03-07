FROM node:14.14.0-alpine3.12

WORKDIR /app

COPY . .


WORKDIR /app/ui

RUN npm install && npm run build

WORKDIR /app/api

RUN npm install && npm run build

EXPOSE 3333


CMD ["npm", "start"]