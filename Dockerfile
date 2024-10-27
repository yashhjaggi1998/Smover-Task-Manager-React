# Use the Node.js image as a base image
FROM node:18.18.0-alpine AS builder

# Create and set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./

#Install dependencies
RUN npm install

# Copy the rest of the code to the container
COPY . .

# Build the application
RUN npm run build

CMD ["npm", "run", "start"]

# Use a lightweight web server for serving static files
#FROM nginx:alpine

# Copy custom Nginx configuration (if needed)
#COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built application from the builder stage
#COPY --from=builder /app/.next /usr/share/nginx/html

# Expose the port for the web server
#EXPOSE 8080

#CMD ["nginx", "-g", "daemon off;"]
