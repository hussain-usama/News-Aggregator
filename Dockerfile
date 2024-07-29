FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# STEP 1 : Run the command to build a docker image => docker build .
# STEP 2 : Run the command to get list of all docker images created => docker images
# Step 3 : Run ' docker run -p 3000:3000 IMAGE_ID ' it will start a container from the specified Docker image
# Now the project will successfully run on  http://localhost:3000 . Make sure Docker Engine is running in background