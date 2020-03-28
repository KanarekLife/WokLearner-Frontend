### Stage 1: Build ###
FROM node AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

### Stage 2: Run ###
FROM nginx
COPY --from=build /usr/src/app/dist/WokLearner /usr/share/nginx/html
