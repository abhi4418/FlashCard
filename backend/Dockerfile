FROM node:alpine

WORKDIR /backend

COPY package*.json ./

RUN npm install

RUN npm install -g prisma

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]
