FROM node:10.5.0

WORKDIR /Web_Course_Project

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000
CMD ["npm", "start"]
