FROM node:12

# Create app directory
WORKDIR /app
COPY . /app/.
RUN yarn install

# SSH
ENV SSH_PASSWD "root:Docker!"
RUN apt-get update \
  && apt-get install -y --no-install-recommends dialog \
  && apt-get update \
  && apt-get install -y --no-install-recommends openssh-server \
  && echo "$SSH_PASSWD" | chpasswd

COPY sshd_config /etc/ssh/
COPY init.sh /usr/local/bin/

ENV MONGO_STRING=
ENV ADMIN_EMAIL=
ENV ADMIN_PASSWORD=
ENV SECRET=
ENV TOKEN_VALIDITY_MINUTES=
ENV NODE_ENV=
ENV PORT=
ENV BASE_LANGUAGE=
ENV TRANSLATION_ENDPOINT=
ENV LANGUAGES_ENDPOINT=
ENV TRANSLATION_KEY=
ENV TRANSLATION_STRINGS_CSV_URL=

RUN chmod u+x /usr/local/bin/init.sh
RUN yarn gen
EXPOSE 80 2222

ENTRYPOINT ["init.sh"]