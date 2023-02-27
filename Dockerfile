FROM node:lts-alpine3.16

WORKDIR /src
COPY src .

RUN npm install
CMD [ "node", "app.js" ]