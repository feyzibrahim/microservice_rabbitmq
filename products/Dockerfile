FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8001
# RUN npm run build

CMD ["npm", "run", "start"]
