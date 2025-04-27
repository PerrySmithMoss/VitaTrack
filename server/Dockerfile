# Stage 1: Build
FROM node:22.14.0-bullseye-slim AS builder

WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y libssl1.1 && \
    rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock ./
COPY prisma ./prisma/

# Install ALL dependencies (dev + prod)
RUN yarn install --frozen-lockfile

# Copy and build source
COPY tsconfig.json .
COPY src ./src

# Generate the Prisma Client and build app
RUN npx prisma generate && yarn build

# Stage 2: Production dependencies only
FROM node:22.14.0-bullseye-slim AS deps

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

# Stage 3: Final image
FROM node:22.14.0-bullseye-slim AS runner

# Install tini (smallest init system to handle signals properly)
RUN apt-get update && apt-get install -y tini && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy ONLY what's needed from previous stages
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=deps /app/node_modules ./node_modules

# Copy Prisma generated client
COPY --from=builder /app/node_modules/@prisma /app/node_modules/@prisma
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma

# Copy entrypoint script 
# TODO: is there anyway to get around this, so we don't have to have this 
# dedicated step for loading and converting the DATABASE_URL to an 
# environment variable?
COPY scripts/deployment-entry.sh /deployment-entry.sh
RUN chmod +x /deployment-entry.sh

# Drop privileges
RUN chown -R node:node /app
USER node

# Configure tini
ENTRYPOINT ["/usr/bin/tini", "--"]

EXPOSE 5500

CMD ["/deployment-entry.sh"]