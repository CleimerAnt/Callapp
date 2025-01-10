FROM node:20.5.0-alpine3.18
RUN addgroup callapp && adduser -S -G callapp callapp   
USER callapp
WORKDIR /app/
COPY --chown=callapp package*.json .    
RUN npm install
COPY --chown=callapp . .
EXPOSE 5173
CMD ["npm","run","dev"]