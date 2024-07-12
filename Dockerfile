FROM node:lts-alpine

WORKDIR /usr/app
COPY package.json ./
RUN npm install
COPY server/ ./
EXPOSE 9000

CMD ["node", "index.js"]