# Use Node official image
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Command to run the app
CMD ["npm", "start"]
