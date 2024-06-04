markdown
# Proyecto de Gestión de Torneos de Esports

Este es un proyecto desarrollado con NestJS para la gestión de torneos de esports. La aplicación proporciona funcionalidades para crear, actualizar, eliminar y consultar torneos, jugadores y resultados, lo que permite administrar eficientemente los eventos y mantener la información actualizada.

## Configuración

### Requisitos previos

- Node.js y npm instalados en tu sistema
- PostgreSQL instalado y configurado

### Instalación

1. Clona este repositorio en tu máquina local:


git clone <(https://github.com/AlexanderHernandez17/Esports_NestJs.git)>


2. Navega hasta la carpeta del proyecto:


cd esports_nestjs


3. Instala las dependencias del proyecto:


npm install


### Configuración de la base de datos

1. Crea una base de datos PostgreSQL para el proyecto.

2. Configura las variables de entorno en un archivo `.env` en la raíz del proyecto:


DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_NAME=nombre_de_tu_base_de_datos


3. Asegúrate de que la sincronización automática esté desactivada en `app.module.ts` si no deseas que TypeORM sincronice automáticamente las entidades con la base de datos en cada ejecución:

typescript
synchronize: false,


4. Ejecuta las migraciones para crear las tablas en la base de datos:


npm run migrate


## Uso

Una vez que hayas configurado la base de datos y ejecutado las migraciones, puedes iniciar el servidor de desarrollo con el siguiente comando:


npm run start:dev


Esto iniciará el servidor en `http://localhost:3000` por defecto.

## Documentación

La API está documentada utilizando Swagger. Puedes acceder a la documentación en `http://localhost:3000/api`.

## Semillas

Puedes ejecutar las semillas para poblar la base de datos con datos de ejemplo utilizando el siguiente comando:


npm run seed


## Contribución

Si deseas contribuir al proyecto, puedes hacerlo enviando un pull request. Por favor, asegúrate de seguir las directrices de contribución.
