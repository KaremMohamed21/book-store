FROM node:16

RUN mkdir -p /home/app

COPY . /home/app

WORKDIR /home/app

RUN npm install nodemon

RUN npm install

CMD ["npm", "start"]