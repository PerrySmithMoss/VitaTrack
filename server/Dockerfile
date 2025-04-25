# Stage 1: Build
FROM node:22.15.0-slim AS builder

WORKDIR /app

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
FROM node:22.15.0-slim AS deps

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

# Stage 3: Final image
FROM node:22.15.0-slim AS runner

WORKDIR /app

# Copy ONLY what's needed from previous stages
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=deps /app/node_modules ./node_modules

RUN chown -R nodeuser:root /app

USER nodeuser

EXPOSE 5500

CMD ["node", "dist/server.js"]