FROM node:22-alpine AS client-build
WORKDIR /client
COPY client/package*.json ./
RUN npm install
COPY client .
RUN npm run build

FROM node:22-alpine AS server-build
WORKDIR /server
COPY server/package*.json ./
RUN npm install
COPY server .

FROM nginx:1.27-alpine

COPY --from=client-build /client/dist /usr/share/nginx/html

COPY --from=server-build /server /server
RUN apk add --no-cache nodejs npm

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD sh -c "node /server/index.js & nginx -g 'daemon off;'"
