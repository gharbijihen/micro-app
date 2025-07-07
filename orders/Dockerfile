FROM node:18                

WORKDIR /app  

COPY orders/tsconfig.json ./
COPY orders/package.json ./       

RUN npm install            

COPY orders/ ./

RUN npm run build            

EXPOSE 3020                

CMD ["npm", "start"]       
