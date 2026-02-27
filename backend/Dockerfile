FROM node:24-alpine
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm install --production
COPY --chown=node:node . .
EXPOSE 5000
USER node
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:5000/ || exit 1
CMD ["node", "server.js"]
