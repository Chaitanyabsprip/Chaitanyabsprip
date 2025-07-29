FROM oven/bun:latest
WORKDIR /app
COPY package.json tsconfig.json ./
COPY data.yml ./
COPY src/ ./src/
COPY public/ ./public/
RUN bun install
CMD ["bun", "run", "src/server.ts"]
