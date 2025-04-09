# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /zero_to_coder

COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /zero_to_coder

COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "run", "start"]

