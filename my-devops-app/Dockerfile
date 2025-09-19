FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy frontend code
COPY . .

# Expose frontend port
EXPOSE 3000

# Start frontend
CMD ["npm", "start"]