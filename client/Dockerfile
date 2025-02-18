# Step 1: Build the Vite app using node
FROM node:18 AS build

WORKDIR /client

# Copy only package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all the source code (components, pages, etc.)
COPY . .

# Run the build command to create the production-ready files in /client/build
RUN npm run build

# Step 2: Use Nginx to serve the build folder
FROM nginx:alpine

# Remove default Nginx index.html (which will be replaced with the Vite build)
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output (which only contains compiled static assets) into Nginx's serving directory
COPY --from=build /client/build /usr/share/nginx/html

# Expose port 80 (default HTTP port)
EXPOSE 80

# Start Nginx in the foreground to serve the static files
CMD ["nginx", "-g", "daemon off;"]
