FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g ts-node typescript

COPY . .

EXPOSE 3000

CMD [ "sh", "-c", "ts-node ./script/seed.ts && npm run dev" ]