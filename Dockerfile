FROM node:23-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chown -R node:node -R /app

USER node

EXPOSE 3000

CMD ["npm", "run", "dev"]