# Use the official Nginx image as the base image
FROM nginx

# Copy the build files into the image
COPY build/ /usr/share/nginx/html/

# Copy the Nginx configuration file into the image
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the container's port 80 to the outside world
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
