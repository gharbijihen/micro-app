FROM node:18                

WORKDIR /app  

COPYtsconfig.json ./
COPYpackage.json ./       

RUN npm install            

COPY orders/ ./

RUN npm run build            

EXPOSE 3020                

CMD ["npm", "start"]       
