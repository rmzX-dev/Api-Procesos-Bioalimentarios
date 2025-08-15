# 📮 Guía para usar Postman con la API de Procesos Bioalimentarios

## 🎯 **Problema identificado y solucionado**

**Problema**: La API funcionaba con curl pero no con Postman o aplicaciones web debido a restricciones de CORS.

**Solución implementada**:
- ✅ Configuración de CORS simplificada y permisiva
- ✅ Middleware adicional para manejar preflight requests
- ✅ Headers CORS configurados correctamente

## 🚀 **Configuración de Postman**

### 1. **Configuración básica**
- **Base URL**: `https://nutriapi.up.railway.app`
- **Environment**: Crear un environment con la variable `base_url`

### 2. **Headers recomendados**
```
Content-Type: application/json
Accept: application/json
```

## 🧪 **Colección de Postman**

### **👥 Gestión de Usuarios**

#### **GET - Listar usuarios**
- **Method**: GET
- **URL**: `{{base_url}}/api/user`
- **Headers**: Solo los básicos

#### **POST - Crear usuario**
- **Method**: POST
- **URL**: `{{base_url}}/api/user`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body** (raw JSON):
  ```json
  {
    "nombre": "Usuario Test",
    "apellidoPaterno": "Apellido",
    "apellidoMaterno": "Materno",
    "correo": "test@example.com",
    "contrasenia": "123456",
    "telefono": "1234567890"
  }
  ```

#### **PUT - Actualizar usuario**
- **Method**: PUT
- **URL**: `{{base_url}}/api/user/1`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body** (raw JSON):
  ```json
  {
    "nombre": "Usuario Actualizado",
    "apellidoPaterno": "Apellido",
    "apellidoMaterno": "Materno",
    "correo": "test@example.com",
    "contrasenia": "123456",
    "telefono": "1234567890"
  }
  ```

#### **DELETE - Eliminar usuario**
- **Method**: DELETE
- **URL**: `{{base_url}}/api/user/1`
- **Headers**: Solo los básicos

#### **POST - Login**
- **Method**: POST
- **URL**: `{{base_url}}/api/login`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body** (raw JSON):
  ```json
  {
    "correo": "test@example.com",
    "contrasenia": "123456"
  }
  ```

### **🏢 Gestión de Clientes**

#### **GET - Listar clientes**
- **Method**: GET
- **URL**: `{{base_url}}/api/clientes`

#### **POST - Crear cliente**
- **Method**: POST
- **URL**: `{{base_url}}/api/clientes`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body** (raw JSON):
  ```json
  {
    "razonSocial": "Cliente Test",
    "direccion": "Dirección Test"
  }
  ```

#### **PUT - Actualizar cliente**
- **Method**: PUT
- **URL**: `{{base_url}}/api/clientes/1`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body** (raw JSON):
  ```json
  {
    "razonSocial": "Cliente Actualizado",
    "direccion": "Dirección Actualizada"
  }
  ```

#### **DELETE - Eliminar cliente**
- **Method**: DELETE
- **URL**: `{{base_url}}/api/clientes/1`

### **🧪 Gestión de Muestras**

#### **GET - Listar muestras**
- **Method**: GET
- **URL**: `{{base_url}}/api/muestra`

#### **POST - Crear muestra**
- **Method**: POST
- **URL**: `{{base_url}}/api/muestra`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body** (raw JSON):
  ```json
  {
    "idCliente": 1,
    "descripcion": "Muestra de prueba"
  }
  ```

#### **PUT - Actualizar muestra**
- **Method**: PUT
- **URL**: `{{base_url}}/api/muestra/1`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body** (raw JSON):
  ```json
  {
    "idCliente": 1,
    "descripcion": "Muestra actualizada"
  }
  ```

#### **DELETE - Eliminar muestra**
- **Method**: DELETE
- **URL**: `{{base_url}}/api/muestra/1`

## 🔧 **Solución de problemas comunes**

### **Error de CORS**
- **Síntoma**: Error en consola del navegador sobre CORS
- **Solución**: La configuración ya está corregida en el servidor

### **Error de preflight**
- **Síntoma**: Error OPTIONS request falla
- **Solución**: El middleware CORS ya maneja esto

### **Headers faltantes**
- **Síntoma**: Error 400 o 500
- **Solución**: Asegúrate de incluir `Content-Type: application/json`

## 📱 **Prueba desde navegador**

También puedes probar la API directamente desde el navegador usando el archivo `test-cors.html` que se creó:

1. Abre `test-cors.html` en tu navegador
2. Haz clic en los botones para probar cada método
3. Verifica que no haya errores de CORS en la consola

## ✅ **Verificación**

Para verificar que CORS funciona correctamente:

1. **Desde Postman**: Todas las peticiones deberían funcionar
2. **Desde navegador**: No debería haber errores de CORS
3. **Desde aplicaciones**: Deberían poder hacer requests sin problemas

## 🎉 **Resultado esperado**

Después de estos cambios, tu API debería funcionar perfectamente con:
- ✅ Postman
- ✅ Aplicaciones web
- ✅ Aplicaciones móviles
- ✅ Cualquier cliente HTTP

---
*Última actualización: 15 de Agosto, 2025*
