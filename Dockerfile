# Use official Node.js image as a base image
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Serve the app using a static file server
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Expose port
EXPOSE 3004
