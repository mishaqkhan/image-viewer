FROM node:gallium

WORKDIR /usr/app

COPY package*.json ./
RUN npm ci -qy

COPY . .

CMD ["npm", "start"]