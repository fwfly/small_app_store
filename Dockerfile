FROM node:4.6
MAINTAINER ShengWen
ADD small_app_store.tar.gz /appstore/
RUN apt-get update && apt-get -y install build-essential
WORKDIR  /appstore/bundle/programs/server
RUN npm install

