ARG NODE_IMAGE=node:26.13.0-trixie-slim@sha256:5adad64f9a1fca2d51972caa65983634c8a774eb300d72b20f7f2a0f60368072

FROM ${NODE_IMAGE} AS yarn-base
RUN npm install --global yarn@1.22.22

# Stage 1: Build
FROM yarn-base AS builder

WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates openssl python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock prisma.config.ts ./
COPY prisma ./prisma/

# Install ALL dependencies (dev + prod)
RUN yarn install --frozen-lockfile

# Copy and build source
COPY tsconfig.json .
COPY src ./src

# Generate the Prisma Client and build app
RUN yarn build

# Stage 2: Production dependencies only
FROM yarn-base AS deps

WORKDIR /app

# Install production dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates openssl python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

# Stage 3: Final image
FROM ${NODE_IMAGE} AS runner

# Install tini (smallest init system to handle signals properly)
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates openssl tini && rm -rf /var/lib/apt/lists/*

# Runtime and Prisma migrations only need Node, not package installers.
RUN rm -rf /usr/local/lib/node_modules /opt/yarn-* \
    /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack \
    /usr/local/bin/yarn /usr/local/bin/yarnpkg

WORKDIR /app

# Copy ONLY what's needed from previous stages
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=deps /app/node_modules ./node_modules

COPY scripts/deployment-entry.sh /deployment-entry.sh
RUN chmod +x /deployment-entry.sh

# Drop privileges
RUN chown -R node:node /app
USER node

# Configure tini
ENTRYPOINT ["/usr/bin/tini", "--"]

EXPOSE 5500

COPY scripts/healthcheck.mjs ./healthcheck.mjs
HEALTHCHECK --interval=10s --timeout=3s --start-period=30s --start-interval=1s --retries=3 \
  CMD ["node", "/app/healthcheck.mjs"]

CMD ["/deployment-entry.sh"]
