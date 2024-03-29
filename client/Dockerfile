FROM node:20

WORKDIR /app/src/client

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["yarn", "run", "start"]