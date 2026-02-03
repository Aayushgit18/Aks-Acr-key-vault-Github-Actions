FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm config set fetch-retries 5 \
 && npm config set fetch-retry-mintimeout 20000 \
 && npm config set fetch-retry-maxtimeout 120000 \
 && npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/angular-crud /usr/share/nginx/html






