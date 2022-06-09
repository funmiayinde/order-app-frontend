FROM node:16.14.0-alpine3.14 as build

WORKDIR /app

COPY package.json  .
COPY package-lock.json .
COPY .env.production .
RUN npm install
COPY . .

RUN npm run build

# Second stage: runtime
FROM node:16.14.0-alpine3.14

WORKDIR /app

ENV NODE_ENV=production

COPY package.json  .
COPY package-lock.json .
RUN npm install --only=production

COPY --from=build /app/.next/ /app/.next/

ENV PORT 3000
EXPOSE 3000

CMD ["npm", "run", "start"]