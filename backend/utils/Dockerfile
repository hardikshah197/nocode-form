FROM node:10-alpine
LABEL Dev=hardikshah.hs2015@gmail.com
WORKDIR /usr/scr/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 6000
CMD ["npm", "start"]