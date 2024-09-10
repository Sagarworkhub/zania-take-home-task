FROM node:20.11.0-alpine

# Install pnpm
RUN npm install -g pnpm

# Manually set the global directory and add to PATH
ENV PNPM_HOME=/usr/local/share/pnpm
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy application source
COPY . .

# Increase memory limit and build the application
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN pnpm run build

# Install serve to run the application
RUN pnpm add --global serve

EXPOSE 80

CMD ["serve", "-s", "dist", "-l", "80"]
