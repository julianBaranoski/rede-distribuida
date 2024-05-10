FROM node:18.14.0-alpine

WORKDIR /app

COPY ./ /app/

CMD npm install && npm run start
