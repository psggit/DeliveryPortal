FROM node:6.11.2
COPY ./ /app
WORKDIR /app

# ENV NODE_PATH /app/node_modules/
# ENV NODE_PATH /usr/lib/node_modules/
RUN npm install

RUN npm run build

ENTRYPOINT ["npm", "run", "start"]
