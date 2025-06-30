# Etapa de build
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa de produção
FROM nginx:alpine

# Copia os arquivos buildados para a pasta pública do NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Remove o arquivo de configuração padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copia o nginx.conf e renomeia corretamente como default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta que o NGINX irá escutar
EXPOSE 80

# Comando padrão do container
CMD ["nginx", "-g", "daemon off;"]
