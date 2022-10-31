FROM node:18-alpine as development

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .
RUN npm run build

FROM node:18-alpine as production

WORKDIR /usr/src/app

COPY --from=dev /usr/src/app/dist ./dist
# SSR
COPY --from=dev /usr/src/app/public ./public
COPY --from=dev /usr/src/app/views ./views

CMD ["node", "build/index"]
