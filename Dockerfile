FROM node:16

WORKDIR /usr/src/app

COPY . .

# install node_modules
ADD package.json /usr/src/app/package.json
RUN npm install

EXPOSE 3000

RUN chmod 755 /usr/src/app

CMD ["npm", "start"]