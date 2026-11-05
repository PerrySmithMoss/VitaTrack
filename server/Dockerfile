ARG NODE_IMAGE=node:22.23.4-trixie-slim@sha256:be1e2a3dc2c4fd68cdfadad2a696a280e0d2749098bee509230174d72fb768c6

# Stage 1: Build
FROM ${NODE_IMAGE} AS builder

WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates openssl python3 make g++ && \
    ln -s /usr/bin/python3 /usr/bin/python && \
    npm install -g node-gyp && \
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
FROM ${NODE_IMAGE} AS deps

WORKDIR /app

# Install production dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates openssl python3 make g++ && \
    ln -s /usr/bin/python3 /usr/bin/python && \
    npm install -g node-gyp && \
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
COPY --from=deps /app/node_modules ./node_modules

# Copy Prisma generated client
COPY --from=builder /app/node_modules/@prisma /app/node_modules/@prisma
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma

COPY scripts/deployment-entry.sh /deployment-entry.sh
RUN chmod +x /deployment-entry.sh

# Drop privileges
RUN chown -R node:node /app
USER node

# Configure tini
ENTRYPOINT ["/usr/bin/tini", "--"]

EXPOSE 5500

CMD ["/deployment-entry.sh"]
