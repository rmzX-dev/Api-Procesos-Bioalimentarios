-- Script de Base de Datos para API de Procesos Bioalimentarios
-- Base de datos: estadias
-- Compatible con PostgreSQL

-- Crear la base de datos (ejecutar como superusuario)
-- CREATE DATABASE estadias;

-- Conectar a la base de datos
-- \c estadias;

-- Tabla de Usuarios
CREATE TABLE usuarios (
    idUsuario SERIAL PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL,
    apellidoPaterno VARCHAR(40) NOT NULL,
    apellidoMaterno VARCHAR(40),
    correo VARCHAR(50) UNIQUE NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    telefono VARCHAR(20)
);

-- Tabla de Clientes
CREATE TABLE clientes (
    idCliente SERIAL PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL,
    apellidoPaterno VARCHAR(40) NOT NULL,
    apellidoMaterno VARCHAR(40),
    razonSocial VARCHAR(200) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    metodo VARCHAR(255) NOT NULL,
    acreditacion VARCHAR(255) NOT NULL
);

-- Tabla de Muestras
CREATE TABLE muestra (
    idMuestra SERIAL PRIMARY KEY,
    idCliente INTEGER NOT NULL,
    folio VARCHAR(20) NOT NULL,
    descripcion TEXT,
    fechaMuestreo DATE NOT NULL,
    fechaRecepcion DATE NOT NULL,
    temperatura DECIMAL(5,2),
    FOREIGN KEY (idCliente) REFERENCES clientes(idCliente) ON DELETE CASCADE
);

-- Tabla de Análisis
CREATE TABLE analisis (
    idAnalisis SERIAL PRIMARY KEY,
    idMuestra INTEGER NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    FOREIGN KEY (idMuestra) REFERENCES muestra(idMuestra) ON DELETE CASCADE
);

-- Tabla de Análisis de Proteínas
CREATE TABLE analisisproteinas (
    idAnalisisProteinas SERIAL PRIMARY KEY,
    idAnalisis INTEGER NOT NULL,
    resultado DECIMAL(10,4) NOT NULL,
    unidad VARCHAR(20) NOT NULL,
    metodoReferencia VARCHAR(100) NOT NULL,
    acreditacion VARCHAR(10) NOT NULL,
    FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis) ON DELETE CASCADE
);

-- Tabla de Análisis de Cenizas
CREATE TABLE analisiscenizas (
    idAnalisisCenizas SERIAL PRIMARY KEY,
    idAnalisis INTEGER NOT NULL,
    resultado DECIMAL(10,4) NOT NULL,
    unidad VARCHAR(20) NOT NULL,
    metodoReferencia VARCHAR(100) NOT NULL,
    acreditacion VARCHAR(10) NOT NULL,
    FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis) ON DELETE CASCADE
);

-- Tabla de Análisis de Humedad
CREATE TABLE analisishumedad (
    idAnalisisHumedad SERIAL PRIMARY KEY,
    idAnalisis INTEGER NOT NULL,
    resultado DECIMAL(10,4) NOT NULL,
    unidad VARCHAR(20) NOT NULL,
    metodoReferencia VARCHAR(100) NOT NULL,
    acreditacion VARCHAR(10) NOT NULL,
    FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis) ON DELETE CASCADE
);

-- Tabla de Análisis de Fibra Dietética
CREATE TABLE analisisfibradietetica (
    idanalisisFibraDietetica SERIAL PRIMARY KEY,
    idAnalisis INTEGER NOT NULL,
    resultado DECIMAL(10,4) NOT NULL,
    unidad VARCHAR(20) NOT NULL,
    metodoReferencia VARCHAR(100) NOT NULL,
    acreditacion VARCHAR(10) NOT NULL,
    FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis) ON DELETE CASCADE
);

-- Tabla de Análisis de Carbohidratos
CREATE TABLE analisiscarbohidratos (
    idAnalisisCarbohidratos SERIAL PRIMARY KEY,
    idAnalisis INTEGER NOT NULL,
    resultado DECIMAL(10,4) NOT NULL,
    unidad VARCHAR(20) NOT NULL,
    metodoReferencia VARCHAR(100) NOT NULL,
    acreditacion VARCHAR(10) NOT NULL,
    FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis) ON DELETE CASCADE
);

-- Tabla de Análisis de Sodio
CREATE TABLE analisissodio (
    idAnalisisSodio SERIAL PRIMARY KEY,
    idAnalisis INTEGER NOT NULL,
    resultado DECIMAL(10,4) NOT NULL,
    unidad VARCHAR(20) NOT NULL,
    metodoReferencia VARCHAR(100) NOT NULL,
    acreditacion VARCHAR(10) NOT NULL,
    FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis) ON DELETE CASCADE
);

-- Tabla de Análisis Energético
CREATE TABLE analisisenergetico (
    idAnalisisEnergetico SERIAL PRIMARY KEY,
    idAnalisis INTEGER NOT NULL,
    resultadoKcal DECIMAL(10,4) NOT NULL,
    resultadoKj DECIMAL(10,4) NOT NULL,
    unidadKcal VARCHAR(20) NOT NULL,
    unidadKj VARCHAR(20) NOT NULL,
    metodoReferencia VARCHAR(100) NOT NULL,
    acreditacion VARCHAR(10) NOT NULL,
    FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis) ON DELETE CASCADE
);

-- Tabla de Análisis de Ácidos Grasos
CREATE TABLE analisisacidosgrasos (
    idAnalisisAcidosGrasos SERIAL PRIMARY KEY,
    idAnalisis INTEGER NOT NULL,
    resultado DECIMAL(10,4) NOT NULL,
    unidad VARCHAR(20) NOT NULL,
    metodoReferencia VARCHAR(100) NOT NULL,
    acreditacion VARCHAR(10) NOT NULL,
    resultadoTrans DECIMAL(10,4),
    resultadoSaturadas DECIMAL(10,4),
    resultadoMonoinsaturados DECIMAL(10,4),
    resultadoPolyinsaturados DECIMAL(10,4),
    total DECIMAL(10,4),
    FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis) ON DELETE CASCADE
);

-- Tabla de Historial de Folios (FOLAV)
CREATE TABLE folav (
    idHistorial SERIAL PRIMARY KEY,
    idAnalisis INTEGER NOT NULL,
    idUsuario INTEGER NOT NULL,
    fechaGeneracion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis) ON DELETE CASCADE,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE
);

-- Tabla de Contenido Nutrimental
CREATE TABLE contenidoNutrimental (
    idContenidoNutrimental SERIAL PRIMARY KEY,
    idMuestra INTEGER NOT NULL,
    idAnalisis INTEGER NOT NULL,
    idFolav INTEGER NOT NULL,
    idUsuario INTEGER NOT NULL,
    FOREIGN KEY (idMuestra) REFERENCES muestra(idMuestra) ON DELETE CASCADE,
    FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis) ON DELETE CASCADE,
    FOREIGN KEY (idFolav) REFERENCES folav(idHistorial) ON DELETE CASCADE,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_muestra_idcliente ON muestra(idCliente);
CREATE INDEX idx_analisis_idmuestra ON analisis(idMuestra);
CREATE INDEX idx_usuarios_correo ON usuarios(correo);
CREATE INDEX idx_clientes_razonsocial ON clientes(razonSocial);
CREATE INDEX idx_folav_idanalisis ON folav(idAnalisis);
CREATE INDEX idx_folav_idusuario ON folav(idUsuario);