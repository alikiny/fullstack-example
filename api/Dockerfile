FROM node:14-alpine
WORKDIR /api
COPY package.json ./
RUN npm install --force && npm install -g nodemon
# if we run CMD with start:dev, then the image needs to have nodemon installed also
COPY . ./
EXPOSE 8080
CMD ["npm", "run", "start:dev"] 