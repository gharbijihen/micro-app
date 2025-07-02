# FROM node:alpine

# WORKDIR /app
# COPY package.json .
# RUN npm install --omit=dev
# COPY . .

# CMD ["npm", "start"]
# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json ./
RUN npm install

COPY . .

# Build the app
RUN npm run build

# Expose app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

