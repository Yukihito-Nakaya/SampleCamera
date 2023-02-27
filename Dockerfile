FROM node:lts-alpine3.16

WORKDIR /src
COPY src .
RUN npm install
EXPOSE 3000
CMD [ "nodemon", "app.js" ]