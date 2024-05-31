FROM node:19-alpine

WORKDIR /react-vite-app

EXPOSE 5000

COPY package.json package-lock.json ./

RUN npm install --silent

COPY . ./

CMD ["npm", "run", "dev"]