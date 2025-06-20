# ---- Build Stage ----
FROM node:22-alpine AS development

WORKDIR /usr/src/app

# install build tools and Yarn
RUN apk add --no-cache g++ make python3

# copy only manifest + lockfile for max layer reuse
COPY package.json yarn.lock ./
COPY .env  ./

# install all deps
RUN yarn install --frozen-lockfile

# copy source
COPY . .

# build artifacts
RUN yarn build

# ---- Production Stage ----
FROM node:22-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# copy manifest + lockfile
COPY package.json yarn.lock ./
COPY .env ./

# install only production deps
RUN yarn install --production --frozen-lockfile

# pull in our build output
COPY --from=development /usr/src/app/dist ./dist

# run!
CMD ["node", "dist/main"]
