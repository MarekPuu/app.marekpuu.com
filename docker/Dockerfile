FROM node:lts-alpine as build-stage
RUN mkdir -p /app
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .

ARG API_URL
ENV VITE_APP_API_URL $API_URL

ARG AUTH0_DOMAIN
ENV VITE_AUTH0_DOMAIN $AUTH0_DOMAIN

ARG VITE_AUTH0_CLIENT_ID
ENV VITE_AUTH0_CLIENT_ID $AUTH0_CLIENT_ID

RUN npm run build

FROM nginx:alpine as production-stage
EXPOSE 8082
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
