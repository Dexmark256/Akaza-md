# Use official Node.js image
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose port (optional, if you use web server later)
EXPOSE 3000

# Start the bot
CMD ["npm", "start"]
