#Tipo de aplicacion:
    FROM node:18


    #Direccion donde se va a guardar
    WORKDIR /codercommerce
    
    #Copia de dependencias
    COPY package*.json ./
    
    #Instalacion de modulos
    RUN npm install
    
    #Copia del resto de los archivos
    COPY . .
    
    # Copia del archivo .env
    COPY .env.dev ./

    #Configuracion del puerto de exposicion del contenedor
    EXPOSE 5000
    
    #Configuracion del comando de inicializacion
    CMD ["npm","start"]