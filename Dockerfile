FROM node:14.14.0-alpine3.12

WORKDIR /app

COPY . .

#RUN ls -la .

RUN cd /app/ui && npm install && cd ..

RUN cd /app/api && npm install && npm run build

EXPOSE 3333

WORKDIR /app/api

CMD ["npm", "start"]