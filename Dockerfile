FROM node:18-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm i dotenv

COPY . .

RUN npm run build

FROM node:18-alpine as production

ENV PORT=3000

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/build ./build
# # SSR
COPY --from=development /usr/src/app/public ./public

CMD ["node", "build/index"]
