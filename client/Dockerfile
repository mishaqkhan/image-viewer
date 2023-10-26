FROM node:gallium

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci -qy

COPY . .

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

CMD ["npm", "start"]