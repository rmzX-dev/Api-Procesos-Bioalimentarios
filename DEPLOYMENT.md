# 🚀 Guía de Despliegue en Railway

## Requisitos Previos

1. **Cuenta en Railway**: [railway.app](https://railway.app)
2. **Base de datos PostgreSQL**: Puedes usar Railway PostgreSQL o externa
3. **Git**: Para subir tu código

## Variables de Entorno Requeridas

Configura estas variables en Railway:

### Obligatorias:
- `DATABASE_URL`: URL de conexión a PostgreSQL
- `JWT_SECRET`: Clave secreta para JWT (mínimo 32 caracteres)

### Opcionales:
- `PORT`: Puerto del servidor (Railway lo configura automáticamente)
- `CORS_ORIGIN`: Origen permitido para CORS
- `CONVERTAPI_SECRET`: Si usas ConvertAPI

## Pasos para Desplegar

### 1. Preparar el Repositorio
```bash
# Asegúrate de que todos los archivos estén committeados
git add .
git commit -m "Preparado para despliegue en Railway"
git push origin main
```

### 2. Conectar con Railway
1. Ve a [railway.app](https://railway.app)
2. Crea una nueva cuenta o inicia sesión
3. Haz clic en "New Project"
4. Selecciona "Deploy from GitHub repo"
5. Conecta tu repositorio de GitHub
6. Selecciona el repositorio de tu API

### 3. Configurar Variables de Entorno
1. En tu proyecto de Railway, ve a la pestaña "Variables"
2. Agrega las variables de entorno necesarias:
   ```
   DATABASE_URL=tu_url_de_postgresql
   JWT_SECRET=tu_jwt_secret_super_seguro
   ```

### 4. Configurar Base de Datos
**Opción A: PostgreSQL de Railway**
1. En Railway, ve a "New Service" → "Database" → "PostgreSQL"
2. Railway te dará automáticamente la `DATABASE_URL`
3. Cópiala a las variables de entorno

**Opción B: Base de datos externa**
1. Usa tu propia base de datos PostgreSQL
2. Configura la `DATABASE_URL` manualmente

### 5. Desplegar
1. Railway detectará automáticamente que es un proyecto Node.js
2. Usará el `Procfile` para saber cómo ejecutar la app
3. El despliegue comenzará automáticamente

## Verificación del Despliegue

Una vez desplegado, puedes verificar:

1. **Health Check**: `https://tu-app.railway.app/health`
2. **API Principal**: `https://tu-app.railway.app/`
3. **Documentación**: `https://tu-app.railway.app/api-docs`

## Troubleshooting

### Error de Health Check
Si ves errores como "Healthcheck failed" o "service unavailable":
1. Verifica que la variable `DATABASE_URL` esté configurada correctamente
2. Asegúrate de que la base de datos esté accesible desde Railway
3. Revisa los logs de la aplicación en Railway
4. El health check verifica `/health` y la conexión a la base de datos

### Error de Conexión a Base de Datos
- Verifica que `DATABASE_URL` esté correctamente configurada
- Asegúrate de que la base de datos esté accesible desde Railway
- Formato esperado: `postgresql://usuario:contraseña@host:puerto/base_datos`

### Error de Puerto
- Railway configura automáticamente el puerto
- No necesitas configurar `PORT` manualmente

### Error de Build
- Verifica que todas las dependencias estén en `package.json`
- Revisa los logs de build en Railway
- Asegúrate de que el archivo principal sea `index.js`

### Error de Timeout
- El health check tiene un timeout de 600 segundos
- Si tu aplicación tarda mucho en iniciar, considera optimizar el startup

## Monitoreo

Railway proporciona:
- Logs en tiempo real
- Métricas de rendimiento
- Alertas automáticas
- Escalado automático

## Comandos Útiles

```bash
# Ver logs en Railway
railway logs

# Abrir la aplicación
railway open

# Conectar a la base de datos
railway connect
```

## Soporte

- [Documentación de Railway](https://docs.railway.app/)
- [Discord de Railway](https://discord.gg/railway)
