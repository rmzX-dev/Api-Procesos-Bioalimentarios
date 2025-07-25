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



--SON LINIEAS DE CODIGOS PARA HACER COSAS
SELECT
    a.*,
    m.descripcion AS muestra_descripcion,
    c.razonSocial AS cliente_razon_social,
	c.direccion AS cliente_direccion,
    ah.resultado AS humedad_resultado,
    ah.acreditacion AS humedad_acreditacion,
    ap.resultado AS proteinas_resultado,
    ap.acreditacion AS proteinas_acreditacion,
    ac.resultado AS cenizas_resultado,
    ac.acreditacion AS cenizas_acreditacion,
    afd.resultado AS fibra_resultado,
    afd.acreditacion AS fibra_acreditacion,
    acr.resultado AS carbohidratos_resultado,
    acr.acreditacion AS carbohidratos_acreditacion,
    asd.resultado AS sodio_resultado,
    asd.acreditacion AS sodio_acreditacion,
    aen.resultadoKcal AS energetico_kcal,
    aen.resultadoKj AS energetico_kj,
    aen.acreditacion AS energetico_acreditacion,
    aag.resultadoTrans AS grasas_trans,
    aag.resultadoSaturadas AS grasas_saturadas,
    aag.resultadoMonoinsaturados AS grasas_monoinsaturadas,
    aag.resultadoPolyinsaturados AS grasas_polyinsaturadas,
    aag.total AS grasas_total,
    aag.acreditacion AS grasas_acreditacion,
    f.idHistorial,
    f.fechaGeneracion AS folav_fecha
FROM analisis a
JOIN muestra m ON m.idMuestra = a.idMuestra
JOIN clientes c ON c.idCliente = m.idCliente

LEFT JOIN analisishumedad ah ON ah.idAnalisis = a.idAnalisis
LEFT JOIN analisisproteinas ap ON ap.idAnalisis = a.idAnalisis
LEFT JOIN analisiscenizas ac ON ac.idAnalisis = a.idAnalisis
LEFT JOIN analisisfibradietetica afd ON afd.idAnalisis = a.idAnalisis
LEFT JOIN analisiscarbohidratos acr ON acr.idAnalisis = a.idAnalisis
LEFT JOIN analisissodio asd ON asd.idAnalisis = a.idAnalisis
LEFT JOIN analisisenergetico aen ON aen.idAnalisis = a.idAnalisis
LEFT JOIN analisisacidosgrasos aag ON aag.idAnalisis = a.idAnalisis

LEFT JOIN folav f ON f.idAnalisis = a.idAnalisis

WHERE a.idAnalisis = 4;

SELECT * FROM folav;

SELECT * FROM clientes;

SELECT 
            f.idHistorial,
			f.idAnalisis,
            CONCAT('FOLAB-', a.folio) AS folio,
            c.razonSocial AS cliente,
            f.fechaGeneracion,
            m.descripcion AS muestra
        FROM folav f
        JOIN analisis a ON f.idAnalisis = a.idAnalisis
        JOIN muestra m ON a.idMuestra = m.idMuestra
        JOIN clientes c ON m.idCliente = c.idCliente
        ORDER BY f.fechaGeneracion DESC;

ALTER TABLE folav ADD COLUMN eliminado BOOLEAN DEFAULT FALSE;

CREATE OR REPLACE FUNCTION trigger_eliminar_logicamente_folav()
RETURNS TRIGGER AS $$
BEGIN
  -- Marcar el registro como eliminado en lugar de borrarlo
  UPDATE folav SET eliminado = TRUE WHERE idHistorial = OLD.idHistorial;
  RETURN NULL; -- Evitar la eliminación real
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_delete_folav
BEFORE DELETE ON folav
FOR EACH ROW
EXECUTE FUNCTION trigger_eliminar_logicamente_folav();
