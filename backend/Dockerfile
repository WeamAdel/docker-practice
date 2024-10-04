FROM node:22.9.0-alpine

WORKDIR /app/backend

COPY package.json ./

RUN npm install

RUN npm install -g nodemon

EXPOSE 9000

COPY . .

CMD ["npm", "run", "dev"]
