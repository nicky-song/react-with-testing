FROM docker.artifactory.autozone.com/release/az-base-images/az-rockylinux:latest
#Installing gettext to use envsubst
RUN yum install -y gettext
#Installing nginx
RUN yum install -y nginx

ADD dist /usr/share/nginx/html
#Removing env.js file I use to run the app locally
RUN rm /usr/share/nginx/html/env.js
#Copying the env template file
ADD env.template.js /usr/share/nginx/html/
#Copying nginx config file
ADD nginx.conf /etc/nginx/conf.d/
#Adding the start shell script
ADD start.sh .
RUN chmod +x start.sh
EXPOSE 8080
#Running the start sh as entrypoint
ENTRYPOINT [ "sh", "start.sh"]

