FROM node:18                

WORKDIR /app  

COPY auth/tsconfig.json ./
COPY auth/package.json ./       

RUN npm install            

COPY auth/ ./

RUN npm run build            

EXPOSE 3050                

CMD ["npm", "start"]       
