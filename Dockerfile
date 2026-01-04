# Use Node.js LTS
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies for building)
RUN npm install --legacy-peer-deps

# Bundle app source
COPY . .

# Create logs directory
RUN mkdir -p /usr/src/app/logs

# Expose port
EXPOSE 4000

# Start the application
CMD ["node", "src/index.js"]