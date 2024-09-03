FROM node:20.9.0-alpine AS deps

ENV NODE_ENV=production

# ARG REDIS_HOST
# ENV REDIS_HOST=${REDIS_HOST}
	
WORKDIR /app
COPY package.json pnpm-lock.yaml tsconfig.json ./

RUN npm install -g pnpm && pnpm install --no-frozen-lockfile

RUN pnpm install
# Copy .env and .env.local before the build stage

FROM node:20.9.0-alpine AS build_image

WORKDIR /app


COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm install -g pnpm && pnpm install --no-frozen-lockfile


RUN rm -rf node_modules

RUN pnpm install
RUN pnpm build


FROM node:20.9.0-alpine

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app
COPY --from=build_image --chown=nextjs:nodejs /app/package.json /app/pnpm-lock.yaml ./
COPY --from=build_image --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=build_image --chown=nextjs:nodejs /app/public ./public
COPY --from=build_image --chown=nextjs:nodejs /app/.next ./.next
# COPY --from=build_image --chown=nextjs:nodejs /app/.env ./.env



USER nextjs

EXPOSE 3000

CMD npm start
