FROM node:alpine AS build

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine

RUN npm install -g serve

WORKDIR /frontend

COPY --from=build /frontend/dist /frontend/dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
