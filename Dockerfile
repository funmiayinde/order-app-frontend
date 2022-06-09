FROM node:14-alpine AS builder
WORKDIR /app
COPY ./package.json ./
COPY .env .
RUN npm install
COPY . .
RUN npm run build

FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app ./
COPY --from=build /app/.next/ /app/.next/
CMD ["npm", "run", "start"]