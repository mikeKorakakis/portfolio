FROM node:alpine
WORKDIR /app
ENV PORT 3000

COPY ./ ./
WORKDIR /app/

RUN npm install   --legacy-peer-deps

RUN npm run build
EXPOSE 3000
WORKDIR /app
CMD "npm" "start" 