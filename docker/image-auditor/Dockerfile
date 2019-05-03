FROM node:8

COPY auditor.js /opt/app/
COPY musician-protocol.js /opt/app/

RUN npm install uuid moment

CMD ["node", "/opt/app/auditor.js"]
