## 📄 Resumen Técnico – Prueba Técnica DICRI

## **Contexto y Alcance**

Esta solución fue desarrollada para la prueba técnica del Ministerio Público de Guatemala, enfocada en la Dirección de Investigación Criminalística (DICRI).  
El objetivo fue construir una aplicación para la gestión de expedientes e indicios, con flujos de aprobación/rechazo, reportes y control de usuarios, cumpliendo los lineamientos del documento oficial de la prueba.

## **Arquitectura y Tecnologías**

-   **Frontend:**  ReactJS
    
-   **Backend:**  Node.js con Express
    
-   **Base de Datos:**  SQL Server (con procedimientos almacenados para todas las operaciones)
    
-   **Contenerización:**  Docker y Docker Compose
    
-   **Pruebas:**  Unitarias en backend, endpoints probados con Postman
    

La arquitectura sigue el patrón clásico de tres capas, comunicándose vía servicios RESTful y autenticación JWT para control de roles.
## **Estructura del Proyecto**

    
    ├── Backend/           # Código fuente del API (Node.js/Express)
    ├── Frontend/          # Aplicación ReactJS
    ├── init-db.sql        # Script de creación de base, tablas, SPs y datos de prueba
    ├── docker-compose.yml # Orquestación de servicios
    ├── README.md

## 🚀 Instrucciones para correr en local (sin Docker)

## **1. Requisitos previos**

-   Node.js 18 o superior
    
-   SQL Server (puede ser local o en Docker)
    
-   npm
    

## **2. Base de datos**

1.  Crea una base de datos llamada  `DICRI_DB`  en tu SQL Server.
    
2.  Ejecuta el script  `init-db.sql`  en esa base para crear las tablas, procedimientos y usuarios de prueba.

## **3. Backend**
código para instalar dependencias de backend, el cual  quedará ejecutándose en `http://localhost:3000`:

    cd Backend
    npm install
    # Crea un archivo .env con la configuración de la base de datos, por ejemplo:
    # DB_USER=sa
    # DB_PASSWORD=Dicri2025$User
    # DB_SERVER=localhost
    # DB_PORT=1433
    # DB_DATABASE=DICRI_DB
    # SECRET=un_secret_para_jwt
    npm run dev
## **4. Frontend**
código para instalar dependencias de frontend, el cual  quedará ejecutándose  en `http://localhost:5173`.

    cd Frontend
    npm install
    npm run dev

## **5. Pruebas de endpoints**

-   Usa la colección de Postman incluida (`postman_collection.json`) para probar el flujo completo: login, registro de expedientes, indicios, aprobación/rechazo, reportes.
    
-   Usuarios de prueba:
    
    -   Usuario:  `admin`  / Contraseña:  `admin123`  (técnico)
        
    -   Usuario:  `coordinador`  / Contraseña:  `coord123`  (coordinador)
## ⚠️ Problemas Encontrados y Limitaciones

-   **Contenerización con Docker:**  
    El ambiente local funciona correctamente, pero al contenerizar, surgieron dificultades principalmente con:
    
    -   Sincronización de cambios en el código dentro de los contenedores (hot reload).
        
    -   Configuración de puertos y refresco automático en el frontend (Nginx vs. Vite).
        
    -   Persistencia y reinicialización de la base de datos en Docker.
        
-   **Login de usuarios predeterminados:**  
    El backend utiliza hash bcrypt para las contraseñas. Al crear usuarios directamente en SQL, es necesario insertar el hash, no el texto plano, para que el login funcione correctamente.
    
-   **Documentación y diagramas:**  
    Por limitaciones de tiempo y problemas técnicos, no se incluyeron diagramas detallados ni un manual técnico extenso. Sin embargo, el código está comentado y estructurado para facilitar su revisión.
    
-   **Ambiente de pruebas:**  
    Se recomienda correr el sistema en local para una experiencia más fluida, ya que la versión en Docker puede requerir ajustes adicionales.
    
## Notas finales

-   El repositorio contiene todo el código fuente, scripts y archivos de configuración necesarios.
    
-   Estoy disponible para explicar la lógica, decisiones técnicas y retos enfrentados durante la entrevista.
    
-   Agradezco la oportunidad y quedo atento a cualquier retroalimentación.
