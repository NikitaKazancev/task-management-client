FROM node:current-slim

WORKDIR /client

COPY /src /client/src
COPY /public /client/public
# COPY .env /client/
COPY next-env.d.ts /client/
COPY next.config.mjs /client/
COPY postcss.config.js /client/
COPY tailwind.config.ts /client/
COPY tsconfig.json /client/
COPY bun.lockb /client/
COPY package.json /client/

RUN npm install -g bun
RUN bun install
RUN npm run build

EXPOSE 80

CMD ["npm", "run", "start"]