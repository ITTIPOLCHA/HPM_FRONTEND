# Step 1: Choose a base image with Node.js
FROM node:16-alpine as builder

# Set the working directory in the Docker container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the React application
RUN npm run build:serve:dev

# Step 2: Use nginx or another web server to serve the static content
# For simplicity, we are using serve to serve the build folder
FROM node:16-alpine

# Install serve to serve the app on container startup
RUN npm install -g serve

# Copy the build folder from the build stage to the production image
COPY --from=builder /app/build /app/build

# Set the working directory to the build directory
WORKDIR /app/build

# Expose port 5000 where serve will run
EXPOSE 5000

# Command to run the serve module
CMD ["serve", "-s", "."]
