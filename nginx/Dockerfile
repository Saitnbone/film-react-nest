# FROM nginx:alpine
# COPY nginx.conf /etc/nginx/conf.d/nginx.conf

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY startup.sh /startup.sh
RUN chmod +x /startup.sh
CMD ["/startup.sh"]