FROM node:slim

MAINTAINER J3n5en "admin@j3n5en.com"
# Install pm2 
RUN npm install -g pm2
# Copy files to workdir
COPY app /www
# Define working directory
WORKDIR www
# Install the dependent
RUN npm install
# Expose the 80 post
EXPOSE 80
# Using the pm2 to start the project
CMD ["pm2" , "start", "index.js", "--no-daemon"]