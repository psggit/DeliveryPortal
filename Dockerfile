FROM node:6.11.2

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
RUN npm install

COPY ./ /app

# ENV NODE_PATH /app/node_modules/
# ENV NODE_PATH /usr/lib/node_modules/

RUN npm run build

ENTRYPOINT ["npm", "run", "preview"]
