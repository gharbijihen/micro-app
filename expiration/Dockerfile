FROM node:18                

WORKDIR /app  

COPY tsconfig.json ./
COPY package.json ./       

RUN npm install            
COPY . ./

RUN npm run build            
             

CMD ["npm", "start"]       
