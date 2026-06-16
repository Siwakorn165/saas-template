FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY src ./src
COPY public ./public 2>/dev/null || true

ENV NODE_ENV=production PORT=3000
EXPOSE 3000

CMD ["node", "src/index.js"]