FROM node:17

WORKDIR /app

RUN apt-get update && \
apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libgbm-dev \
libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
ca-certificates fonts-liberation libnss3 lsb-release xdg-utils wget

RUN apt-get install -y nginx

RUN rm -f /etc/nginx/http.d/default.conf

COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

COPY . /app

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]