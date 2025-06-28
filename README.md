# API de Gestión para Procesos Bioalimentarios

API RESTful para la gestión integral de usuarios, clientes, muestras y análisis en sistemas de procesos bioalimentarios. Incluye autenticación JWT, documentación Swagger (OpenAPI 3.0) y estructura modular para fácil mantenimiento y escalabilidad.

---

## 🚀 Tecnologías y Requisitos

- **Node.js** v14+
- **PostgreSQL** v12+
- **npm** v6+

---

## 📁 Estructura de Carpetas

```
Api-Procesos-Bioalimentarios/
├── app.js
├── config/
├── controllers/
├── docs/
├── middlewares/
├── models/
├── routes/
├── services/
├── templates/
├── utils/
├── package.json
├── .env
└── README.md
```

---

## ⚡ Instalación y Configuración

1. **Clona el repositorio:**
   ```bash
git clone https://github.com/rmzX-dev/Api-Procesos-Bioalimentarios.git
cd Api-Procesos-Bioalimentarios
```
2. **Instala dependencias:**
   ```bash
npm install
```
3. **Configura el entorno:**
   Crea un archivo `.env` en la raíz con:
   ```env
DB_USER=tu_usuario
DB_HOST=localhost
DB_NAME=estadias
DB_PASSWORD=tu_contraseña
DB_PORT=5432
PORT=3000
JWT_SECRET=clave_secreta_ultrasegura
```
4. **Configura la base de datos:**
   - Asegúrate de tener PostgreSQL corriendo y la base de datos creada.
   - Ejecuta el script de creación de tablas (ver carpeta `docs/` o usa los modelos como referencia).

5. **Inicia el servidor:**
   ```bash
node app.js
```

---

## 📚 Documentación Swagger (OpenAPI)

- Accede a la documentación interactiva en:
  [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- Toda la definición está en `docs/swagger.yaml` (no se usan comentarios en el código para Swagger).

---

## 🔐 Autenticación JWT

- El login retorna un token JWT que debe enviarse en el header `Authorization: Bearer <token>` para endpoints protegidos.
- El secreto se define en `.env` como `JWT_SECRET`.

### Ejemplo de login
```json
POST /api/login
{
  "correo": "usuario@ejemplo.com",
  "contrasenia": "tu_contraseña"
}
```
Respuesta:
```json
{
  "status": 200,
  "message": "Login exitoso",
  "token": "...",
  "user": { "id": 1, "correo": "usuario@ejemplo.com" }
}
```

---

## 📊 Endpoints Principales

| Método | Endpoint                | Descripción                        |
|--------|-------------------------|------------------------------------|
| POST   | `/api/login`            | Login y obtención de JWT           |
| POST   | `/api/logout`           | Cierre de sesión (logout)          |
| GET    | `/api/user`             | Listar todos los usuarios          |
| POST   | `/api/user`             | Crear usuario                      |
| GET    | `/api/user/{id}`        | Obtener usuario por ID             |
| PUT    | `/api/user/{id}`        | Actualizar usuario                 |
| GET    | `/api/clientes`         | Listar clientes                    |
| POST   | `/api/clientes`         | Crear cliente                      |
| GET    | `/api/clientes/{id}`    | Obtener cliente por ID             |
| GET    | `/api/muestra`          | Listar muestras                    |
| POST   | `/api/muestra`          | Crear muestra                      |
| GET    | `/api/muestra/{id}`     | Obtener muestra por ID             |
| GET    | `/api/analisis`         | Listar análisis                    |
| POST   | `/api/analisis`         | Crear análisis                     |
| GET    | `/api/analisis/{id}`    | Obtener análisis por ID            |
| ...    | `/api/proteinas`        | CRUD análisis de proteínas         |
| ...    | `/api/cenizas`          | CRUD análisis de cenizas           |
| ...    | `/api/humedad`          | CRUD análisis de humedad           |
| ...    | `/api/fibra`            | CRUD análisis de fibra dietética   |
| ...    | `/api/sodio`            | CRUD análisis de sodio             |
| ...    | `/api/carbohidratos`    | CRUD análisis de carbohidratos     |
| ...    | `/api/energetico`       | CRUD análisis energético           |
| ...    | `/api/acidosgrasos`     | CRUD análisis de ácidos grasos     |

> Consulta la documentación Swagger para ver todos los endpoints, parámetros y respuestas detalladas.

---

## 🛠️ Buenas Prácticas
- Usa variables de entorno para credenciales y secretos.
- Mantén la estructura modular para facilitar el mantenimiento.
- Usa la documentación Swagger para pruebas y desarrollo frontend.
- Haz commits atómicos y descriptivos.

---

## 🧑‍💻 Contribuciones

1. Haz un fork del repositorio
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Haz tus cambios y commitea (`git commit -am 'feat: nueva funcionalidad'`)
4. Haz push a tu rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📬 Contacto

Aaron Ochoa Ramirez  
[20233l001005@utcv.edu.mx](mailto:20233l001005@utcv.edu.mx)
