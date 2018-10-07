# Stage 1 - Builder
FROM node:8 as builder

# Create work dir
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy dependencies files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn

# Copy source files 
COPY . .

#Create build files
RUN yarn run build

# Stage 2 - Base image
FROM keymetrics/pm2:latest as base

# Create work dir
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy files from build stage
COPY --from=builder \
  /usr/src/app/package.json \
  /usr/src/app/yarn.lock \
  /usr/src/app/build/ \
  ./

# Install production dependencies
RUN yarn install --production

# Set environment variables
ENV NODE_ENV="prod"
ENV PORT=80

EXPOSE 80

CMD [ "pm2-runtime", "server.js" ]