FROM node:18                

WORKDIR /app  

COPY tsconfig.json ./
COPY package.json ./       

RUN npm install            

COPY tickets/ ./

RUN npm run build            

EXPOSE 3000                

CMD ["npm", "start"]       
