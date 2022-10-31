FROM node:18-alpine as development

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .
RUN npm run build

FROM node:18-alpine as production

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/build ./build
# SSR
COPY --from=development /usr/src/app/public ./public
COPY --from=development /usr/src/app/views ./views

CMD ["node", "build/index"]
