FROM node:24.17.0

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod=false

COPY . .
RUN pnpm list typescript
RUN ls node_modules/typescript/bin

RUN pnpm build

EXPOSE 4000

CMD ["pnpm", "start"]