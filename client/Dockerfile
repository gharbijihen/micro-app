FROM node:18                

WORKDIR /app  

COPY client/tsconfig.json ./
COPY client/package.json ./       

RUN npm install            

COPY client/ ./

RUN npm run build            

EXPOSE 3040                

CMD ["npm", "start"]       
