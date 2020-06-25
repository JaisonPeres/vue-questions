FROM node:alpine as base
RUN mkdir /app
ADD package.json app/package.json
WORKDIR /app
RUN npm install -g @quasar/cli
RUN npm install
ADD . /app
LABEL enviroment="dev"
CMD ["quasar", "dev"]


FROM node:alpine as ssr
COPY --from=base /app /app
WORKDIR /app
RUN npm install -g @quasar/cli
CMD ["quasar", "build" , "-m", "ssr"]


FROM node:alpine as prod
WORKDIR /app
COPY --from=builder /app/dist/ssr /app
CMD ["npm", "run", "start"]
