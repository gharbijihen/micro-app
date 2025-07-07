FROM node:18                

WORKDIR /app  

COPY payments/tsconfig.json ./
COPY payments/package.json ./       

RUN npm install            

COPY payments/ ./

RUN npm run build            

EXPOSE 3010                

CMD ["npm", "start"]       
