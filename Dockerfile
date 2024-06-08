# Base image
FROM node:16-alpine as builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Serve the application using a static server
FROM node:16-alpine
RUN npm install -g serve
COPY --from=builder /app/build /app/build
WORKDIR /app/build
EXPOSE 5000
CMD ["serve", "-s", "."]
