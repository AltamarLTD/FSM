FROM node:10-alpine as build-step
RUN mkdir -p /fsm
WORKDIR /fsm
COPY package.json /fsm
RUN npm install
COPY . /fsm
RUN npm run build --prod
FROM nginx:1.17.1-alpine
COPY --from=build-step /fsm/dist/fish-shop /usr/share/nginx/html
