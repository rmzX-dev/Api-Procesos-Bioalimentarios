#!/bin/bash

# Script de pruebas CRUD para la API desplegada en Railway
API_URL="https://nutriapi.up.railway.app"

echo "🧪 Iniciando pruebas CRUD de la API en Railway..."
echo "📍 URL: $API_URL"
echo ""

# Función para hacer requests y mostrar resultados
test_crud() {
    local endpoint=$1
    local method=$2
    local data=${3:-""}
    local description=$4
    
    echo "🔍 $description"
    echo "   Método: $method $endpoint"
    
    if [ "$method" = "POST" ] || [ "$method" = "PUT" ]; then
        response=$(curl -s -X $method -H "Content-Type: application/json" -d "$data" "$API_URL$endpoint")
    else
        response=$(curl -s -X $method "$API_URL$endpoint")
    fi
    
    echo "   Respuesta: $response" | jq . 2>/dev/null || echo "   Respuesta: $response"
    echo ""
}

# Pruebas de Usuarios
echo "👥 === PRUEBAS CRUD DE USUARIOS ==="

# GET - Listar usuarios
test_crud "/api/user" "GET" "" "Listar usuarios"

# POST - Crear usuario
test_crud "/api/user" "POST" '{"nombre": "Usuario CRUD", "apellidoPaterno": "Test", "apellidoMaterno": "CRUD", "correo": "crud@test.com", "contrasenia": "123456", "telefono": "1234567890"}' "Crear usuario"

# GET - Obtener usuario específico (asumiendo que se creó con ID 6)
test_crud "/api/user/6" "GET" "" "Obtener usuario por ID"

# PUT - Actualizar usuario
test_crud "/api/user/6" "PUT" '{"nombre": "Usuario Actualizado", "apellidoPaterno": "Test", "apellidoMaterno": "CRUD", "correo": "crud@test.com", "contrasenia": "123456", "telefono": "1234567890"}' "Actualizar usuario"

# DELETE - Eliminar usuario
test_crud "/api/user/6" "DELETE" "" "Eliminar usuario"

# Pruebas de Clientes
echo "🏢 === PRUEBAS CRUD DE CLIENTES ==="

# GET - Listar clientes
test_crud "/api/clientes" "GET" "" "Listar clientes"

# POST - Crear cliente
test_crud "/api/clientes" "POST" '{"razonSocial": "Cliente CRUD", "direccion": "Dirección CRUD"}' "Crear cliente"

# GET - Obtener cliente específico
test_crud "/api/clientes/3" "GET" "" "Obtener cliente por ID"

# PUT - Actualizar cliente
test_crud "/api/clientes/3" "PUT" '{"razonSocial": "Cliente Actualizado", "direccion": "Dirección Actualizada"}' "Actualizar cliente"

# Pruebas de Muestras
echo "🧪 === PRUEBAS CRUD DE MUESTRAS ==="

# GET - Listar muestras
test_crud "/api/muestra" "GET" "" "Listar muestras"

# POST - Crear muestra
test_crud "/api/muestra" "POST" '{"idCliente": 3, "descripcion": "Muestra CRUD"}' "Crear muestra"

# GET - Obtener muestra específica
test_crud "/api/muestra/3" "GET" "" "Obtener muestra por ID"

# PUT - Actualizar muestra
test_crud "/api/muestra/3" "PUT" '{"idCliente": 3, "descripcion": "Muestra Actualizada"}' "Actualizar muestra"

# Pruebas de Login
echo "🔐 === PRUEBAS DE AUTENTICACIÓN ==="

# POST - Login
test_crud "/api/login" "POST" '{"correo": "login@test.com", "contrasenia": "123456"}' "Login de usuario"

echo "✅ Pruebas CRUD completadas!"
echo ""
echo "📖 Documentación disponible en: $API_URL/api-docs"
echo "🏥 Health check en: $API_URL/health"
echo "🔗 API principal en: $API_URL/api"
