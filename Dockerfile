FROM nginx:1.19.0
COPY build /etc/nginx/html
# new
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]