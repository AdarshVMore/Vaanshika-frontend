# Use a lightweight base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy only necessary files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

EXPOSE 3001

# Specify the command
CMD ["npm", "start"]
