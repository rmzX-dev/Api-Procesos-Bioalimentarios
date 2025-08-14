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
    razonSocial VARCHAR(200) NOT NULL,
    direccion VARCHAR(200) NOT NULL
);

-- Tabla de Muestras
CREATE TABLE muestra (
    idMuestra SERIAL PRIMARY KEY,
    idCliente INTEGER NOT NULL,
    descripcion VARCHAR(30) NOT NULL,
    FOREIGN KEY (idCliente) REFERENCES clientes(idCliente) ON DELETE CASCADE
);

-- Tabla de Análisis
CREATE TABLE analisis (
    idAnalisis SERIAL PRIMARY KEY,
    idMuestra INTEGER NOT NULL,
    folio INTEGER NOT NULL,
    fechaMuestreo DATE NOT NULL,
    fechaRecepcion DATE NOT NULL,
    temperatura DECIMAL(5,2) NOT NULL,
    desviacion VARCHAR(30) NOT NULL,
    analista VARCHAR(100) NOT NULL,
    fechaInicio DATE NOT NULL,
    fechaTermino DATE NOT NULL,
    FOREIGN KEY (idMuestra) REFERENCES muestra(idMuestra) ON DELETE CASCADE
);

-- Tabla de Análisis de Humedad
CREATE TABLE analisishumedad (
    idAnalisisHumedad SERIAL PRIMARY KEY,
    idAnalisis INTEGER NOT NULL,
    resultado VARCHAR(30) NOT NULL,
    acreditacion VARCHAR(10) NOT NULL,
    FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis) ON DELETE CASCADE
);


-- Tabla de Análisis de Proteínas
CREATE TABLE analisisproteinas (
    idAnalisisProteinas SERIAL PRIMARY KEY,
    idAnalisis INTEGER NOT NULL,
    resultado VARCHAR(30) NOT NULL,
    acreditacion VARCHAR(10) NOT NULL,
    FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis) ON DELETE CASCADE
);

-- Tabla de Análisis de Cenizas
CREATE TABLE analisiscenizas (
    idAnalisisCenizas SERIAL PRIMARY KEY,
    idAnalisis INTEGER NOT NULL,
    resultado VARCHAR(30) NOT NULL,
    acreditacion VARCHAR(10) NOT NULL,
    FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis) ON DELETE CASCADE
);

-- Tabla de Análisis de Fibra Dietética
CREATE TABLE analisisfibradietetica (
    idanalisisFibraDietetica SERIAL PRIMARY KEY,
    idAnalisis INTEGER NOT NULL,
    resultado VARCHAR(30) NOT NULL,
    acreditacion VARCHAR(10) NOT NULL,
    FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis) ON DELETE CASCADE
);

-- Tabla de Análisis de Carbohidratos
CREATE TABLE analisiscarbohidratos (
    idAnalisisCarbohidratos SERIAL PRIMARY KEY,
    idAnalisis INTEGER NOT NULL,
    resultado VARCHAR(30) NOT NULL,
    acreditacion VARCHAR(10) NOT NULL,
    FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis) ON DELETE CASCADE
);

-- Tabla de Análisis de Sodio
CREATE TABLE analisissodio (
    idAnalisisSodio SERIAL PRIMARY KEY,
    idAnalisis INTEGER NOT NULL,
    resultado VARCHAR(30) NOT NULL,
    acreditacion VARCHAR(10) NOT NULL,
    FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis) ON DELETE CASCADE
);

-- Tabla de Análisis Energético
CREATE TABLE analisisenergetico (
    idAnalisisEnergetico SERIAL PRIMARY KEY,
    idAnalisis INTEGER NOT NULL,
    resultadoKcal VARCHAR(30) NOT NULL,
    resultadoKj VARCHAR(30) NOT NULL,
    azucares VARCHAR(30) NOT NULL,
    azucaresAnidados(30) NOT NULL,
    acreditacion VARCHAR(10) NOT NULL,
    FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis) ON DELETE CASCADE
);

-- Tabla de Análisis de Ácidos Grasos
CREATE TABLE analisisacidosgrasos (
    idAnalisisAcidosGrasos SERIAL PRIMARY KEY,
    idAnalisis INTEGER NOT NULL,
    resultadoTrans VARCHAR(30),
    resultadoSaturadas VARCHAR(30),
    resultadoMonoinsaturados VARCHAR(30),
    resultadoPolyinsaturados VARCHAR(30),
    total VARCHAR(30),
    acreditacion VARCHAR(30) NOT NULL,
    FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis) ON DELETE CASCADE
);

-- Tabla de Historial de Folios (FOLAV)
CREATE TABLE folav (
    idHistorial SERIAL PRIMARY KEY,
    idAnalisis INTEGER NOT NULL,
    fechaGeneracion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis) ON DELETE CASCADE
);

CREATE TABLE informacion_preparacion (
    id_preparacion SERIAL PRIMARY KEY,
    idmuestra INTEGER NOT NULL, -- Relación con tu tabla de muestras
    preparacion TEXT,
    
    -- Por 100 ml de producto preparado
    cekc_100ml NUMERIC(10,2),
    cekj_100ml NUMERIC(10,2),
    pr_100ml NUMERIC(10,2),
    gt_100ml NUMERIC(10,2),
    gs_100ml NUMERIC(10,2),
    gtr_100ml NUMERIC(10,2),
    hdc_100ml NUMERIC(10,2),
    az_100ml NUMERIC(10,2),
    aza_100ml NUMERIC(10,2),
    fbd_100ml NUMERIC(10,2),
    so_100ml NUMERIC(10,2),

    -- Por porción preparada
    cekc_porcion NUMERIC(10,2),
    cekj_porcion NUMERIC(10,2),
    pr_porcion NUMERIC(10,2),
    gt_porcion NUMERIC(10,2),
    gs_porcion NUMERIC(10,2),
    gtr_porcion NUMERIC(10,2),
    hdc_porcion NUMERIC(10,2),
    az_porcion NUMERIC(10,2),
    aza_porcion NUMERIC(10,2),
    fbd_porcion NUMERIC(10,2),
    so_porcion NUMERIC(10,2),

    -- Por envase
    cekctev NUMERIC(10,2),
    cekjtev NUMERIC(10,2),

    -- Valores calculados
    ex_azucares_libres NUMERIC(10,2),
    ex_azucares NUMERIC(10,2),
    ex_grasas_s NUMERIC(10,2),
    ex_grasas_t NUMERIC(10,2),
    ex_sodio TEXT,
    ex_sodio2 TEXT,

    -- Sellos
    sellos_exceso_calorias TEXT,
    sellos_exceso_azucares TEXT,
    sellos_exceso_grasas_saturadas TEXT,
    sellos_exceso_grasas_trans TEXT,
    sellos_exceso_sodio TEXT,
    sellos_exceso_sodio2 TEXT,

    -- Banderas
    exceso_ca TEXT,
    exceso_so TEXT,
    exceso_gt TEXT,
    exceso_az TEXT,
    exceso_gs TEXT,

    contenido_neto TEXT,
	FOREIGN KEY (idmuestra) REFERENCES muestra(idmuestra) ON DELETE CASCADE
);


CREATE TABLE documentos_generados (
    id_declaracion_nutrimental SERIAL PRIMARY KEY,
    id_preparacion INT NOT NULL,
    nombre_archivo TEXT NOT NULL,
    fecha_generado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	eliminado BOOLEAN DEFAULT FALSE,
	FOREIGN KEY (id_preparacion) REFERENCES informacion_preparacion(id_preparacion) ON DELETE CASCADE
);



-- Índices para mejorar el rendimiento
CREATE INDEX idx_muestra_idcliente ON muestra(idCliente);
CREATE INDEX idx_analisis_idmuestra ON analisis(idMuestra);
CREATE INDEX idx_usuarios_correo ON usuarios(correo);
CREATE INDEX idx_clientes_razonsocial ON clientes(razonSocial);
CREATE INDEX idx_folav_idanalisis ON folav(idAnalisis);
CREATE INDEX idx_folav_idusuario ON folav(idUsuario);



ALTER TABLE folav ADD COLUMN eliminado BOOLEAN DEFAULT FALSE;


-- ====================================
-- TRIGGER DE BORRADO LÓGICO PARA FOLAV
-- ====================================
CREATE OR REPLACE FUNCTION trigger_eliminar_logicamente_folav()
RETURNS TRIGGER AS $$
BEGIN
  -- Marcar como eliminado
  UPDATE folav 
  SET eliminado = TRUE 
  WHERE idhistorial = OLD.idhistorial;

  -- Evitar borrado físico
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_delete_folav
BEFORE DELETE ON folav
FOR EACH ROW
EXECUTE FUNCTION trigger_eliminar_logicamente_folav();


-- ==============================================
-- TRIGGER DE BORRADO LÓGICO PARA DOCUMENTOS_GENERADOS
-- ==============================================
CREATE OR REPLACE FUNCTION soft_delete_documentos_generados()
RETURNS TRIGGER AS $$
BEGIN
  -- Marcar como eliminado
  UPDATE documentos_generados 
  SET eliminado = TRUE 
  WHERE id_declaracion_nutrimental = OLD.id_declaracion_nutrimental;

  -- Evitar borrado físico
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_soft_delete_documentos_generados
BEFORE DELETE ON documentos_generados
FOR EACH ROW
EXECUTE FUNCTION soft_delete_documentos_generados();
