FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# ./nginx/Dockerfile
# FROM nginx:alpine
# COPY --from=frontend /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf