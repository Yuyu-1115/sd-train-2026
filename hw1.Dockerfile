FROM nginx:stable-alpine

COPY personal-website/index.html /usr/share/nginx/html/index.html
COPY personal-website/styles.css /usr/share/nginx/html/styles.css

EXPOSE 80
