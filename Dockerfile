FROM ubuntu:24.04

ARG DEBIAN_FRONTEND=noninteractive

# Install Apache
RUN apt-get update
RUN apt-get -y install apache2
RUN apt-get update
RUN apt-get -y install apache2-utils
RUN apt install -y tcl
RUN apt install vim

# Install Laravel
RUN /bin/bash -c "$(curl -fsSL https://php.new/install/linux/8.4)"
RUN composer global require laravel/installer

# Create project directory
RUN mkdir -p /var/vhosts/
RUN mkdir -p /var/vhosts/kimventory/

# Set working directory
WORKDIR /var/vhosts/kimventory/

# Install npm dependencies
COPY package.json .
RUN npm install

EXPOSE 80

ENTRYPOINT [ "apache2ctl" ]

CMD [ "-DFOREGROUND" ]