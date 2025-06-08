# **API de Gestión para Procesos Bioalimentarios** 🍏🔬

API RESTful para la gestión integral de usuarios y perfiles en sistemas de procesos bioalimentarios, con autenticación JWT y operaciones CRUD.

---

## **✨ Características Principales**

✅ **Gestión de Usuarios**: Registro y administración de cuentas  
✅ **Autenticación Segura**: JWT con expiración y hashing bcrypt  
✅ **Documentación Swagger**: Interfaz interactiva para pruebas  
✅ **Validación de Datos**: Seguridad en entradas y salidas

---

## **📋 Requisitos Técnicos**

| Tecnología | Versión |
| ---------- | ------- |
| Node.js    | v14+    |
| PostgreSQL | v12+    |
| npm        | v6+     |

## **⚡ Instalación Rápida**

1. **Clonar repositorio**:

```bash
git clone https://github.com/rmzX-dev/Api-Procesos-Bioalimentarios.git
cd Api-Procesos-Bioalimentarios
```

2. **Instalar dependencias**:

```bash
npm install
```

3. **Configurar entorno**:  
   Crear `.env` con:

```env
PG_USER=tu_usuario
PG_HOST=localhost
PG_DATABASE=bioalimentarios_db
PG_PASSWORD=tu_contraseña
PG_PORT=5432
PORT=3000
JWT_SECRET=clave_secreta_ultrasegura
```

4. **Iniciar servidor**:

```bash
node app.js
```

➡️ **Servidor activo en:** `http://localhost:3000`

---

## **🔐 Autenticación JWT**

### **🔑 Inicio de Sesión**

**`POST /api/login`**

```json
{
  "correo": "admin@bioalimentarios.com",
  "contrasenia": "SecurePass123"
}
```

**Respuesta exitosa**:

```json
{
  "status": 200,
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOjEsImNvcnJlbyI6InVzdWFyaW9AZWplbXBsby5jb20iLCJpYXQiOjE2OT...",
  "user": {
    "idUsuario": 1,
    "nombre": "María",
    "apellidoPaterno": "García",
    "correo": "usuario@ejemplo.com",
    "telefono": "5512345678"
  }
}
```

---

## **📊 Endpoints Principales**

### **👥 Usuarios**

| Método | Endpoint         | Acción                 |
| ------ | ---------------- | ---------------------- |
| POST   | `/api/user`      | Crear usuario          |
| GET    | `/api/user/{id}` | Obtener usuario por ID |
| PUT    | `/api/user/{id}` | Actualizar usuario     |

## **📚 Documentación Interactiva**

Explora todos los endpoints en:  
🔗 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**  
Esta documentación está generada con Swagger y proporciona detalles sobre cada endpoint, los parámetros requeridos y las respuestas esperadas.
