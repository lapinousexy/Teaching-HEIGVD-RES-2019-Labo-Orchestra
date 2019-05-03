FROM node:8

COPY musician.js /opt/app/
COPY musician-protocol.js /opt/app/

RUN npm install uuid

ENTRYPOINT ["node", "/opt/app/musician.js"]
