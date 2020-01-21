# front-end build    
FROM node:13-buster AS frontend    

COPY . /app    
WORKDIR /app                  
RUN echo $NODE_URL
RUN echo $NETWORK_ID
RUN npm install && VUE_APP_NODE_URL=$NODE_URL VUE_APP_NETWORK_ID=$NETWORK_ID npm run build

# buil the image
FROM nginx:mainline-alpine    

# copy generated assets    
COPY --from=frontend /app/dist /usr/share/nginx/html    
# copy generated index page    
COPY --from=frontend /app/LICENSE.md /usr/share/nginx/html   
