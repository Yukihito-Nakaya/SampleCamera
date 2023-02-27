FROM node:lts-alpine3.16

EXPOSE 3000
WORKDIR /src
COPY src .
RUN npm install
CMD [ "nodemon", "app.js" ]