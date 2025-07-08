FROM node:18                

WORKDIR /app  

COPY tsconfig.json ./
COPY package.json ./       

RUN npm install            

COPY expiration/ ./

RUN npm run build            

EXPOSE 3030                

CMD ["npm", "start"]       
