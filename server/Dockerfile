FROM node:20

WORKDIR /app/src/server

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD ["yarn", "run", "start"]