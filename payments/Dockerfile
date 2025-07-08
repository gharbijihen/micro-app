FROM node:18                

WORKDIR /app  

COPY tsconfig.json ./
COPY package.json ./       

RUN npm install            

COPY payments/ ./

RUN npm run build            

EXPOSE 3010                

CMD ["npm", "start"]       
