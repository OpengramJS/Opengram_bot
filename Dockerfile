FROM node:16-alpine

WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./

RUN npm install --production

# Bundle app source
COPY . .
