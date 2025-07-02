FROM node:18                

WORKDIR /app  

COPY tickets/tsconfig.json ./
COPY tickets/package.json ./       

RUN npm install            

COPY tickets/ ./

RUN npm run build            

EXPOSE 3000                

CMD ["npm", "start"]       
