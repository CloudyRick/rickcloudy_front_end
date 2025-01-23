# Stage 1: Build the application
FROM node:18-alpine AS build

# Set the working directory in the Docker image
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./
# If you're using Yarn, copy yarn.lock and use yarn install below

# Install dependencies
RUN npm install
# For Yarn, use: RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application
FROM nginx:alpine

# Copy the build output to replace the default nginx contents
COPY --from=build /app/dist /usr/share/nginx/html


# Step 3: Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Step 4: Copy your custom Nginx config file into the container
COPY nginx.conf /etc/nginx/conf.d/

# Expose port 80 to the Docker host, so we can access it 
# from the outside.
EXPOSE 80

# Start nginx and keep the process running
CMD ["nginx", "-g", "daemon off;"]