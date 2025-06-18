CREATE TABLE usuarios (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(40) NOT NULL,
    apellidoPaterno VARCHAR(40) NOT NULL,
    apellidoMaterno VARCHAR(40),
    correo VARCHAR(50) NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL
);

CREATE TABLE clientes (
    idCliente INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(40) NOT NULL,
    apellidoPaterno VARCHAR(40) NOT NULL,
    apellidoMaterno VARCHAR(40),
    razonSocial VARCHAR(200) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    metodo VARCHAR(255) NOT NULL,
    acreditacion VARCHAR(255) NOT NULL
);

CREATE TABLE muestra (
    idMuestra INT PRIMARY KEY AUTO_INCREMENT,
    idCliente INT NOT NULL,
    folio VARCHAR(20) UNIQUE NOT NULL,
    descripcion TEXT NOT NULL,
    fechaMuestreo DATE NOT NULL,
    fechaRecepcion DATE NOT NULL,
    temperatura DECIMAL(5,2) NOT NULL,
    CONSTRAINT fk_muestra_cliente FOREIGN KEY (idCliente) REFERENCES clientes(idCliente)
);

CREATE TABLE analisis (
    idAnalisis INT PRIMARY KEY AUTO_INCREMENT,
    idMuestra INT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    CONSTRAINT fk_analisis_muestra FOREIGN KEY (idMuestra) REFERENCES muestra(idMuestra)
);

CREATE TABLE analisisProteinas(
    idAnalisisProteinas INT PRIMARY KEY AUTO_INCREMENT,
    idAnalisis INT NOT NULL,
    resultado NUMERIC(10,2) NOT NULL,
    unidad VARCHAR(20) NOT NULL, 
    metodoReferencia VARCHAR(100) NOT NULL,
    acreditacion VARCHAR(10) NOT NULL,
    CONSTRAINT fk_analisisProteinas_analisis FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis)
);

CREATE TABLE analisisCenizas(
    idAnalisisCenizas INT PRIMARY KEY AUTO_INCREMENT,
    idAnalisis INT NOT NULL,
    resultado NUMERIC(10,2) NOT NULL,
    unidad VARCHAR(20) NOT NULL, 
    metodoReferencia VARCHAR(100) NOT NULL,
    acreditacion VARCHAR(10) NOT NULL,
    CONSTRAINT fk_analisisCenizas_analisis FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis)
);

CREATE TABLE analisisHumedad(
    idAnalisisHumedad INT PRIMARY KEY AUTO_INCREMENT,
    idAnalisis INT NOT NULL,
    resultado NUMERIC(10,2) NOT NULL,
    unidad VARCHAR(20) NOT NULL, 
    metodoReferencia VARCHAR(100) NOT NULL,
    acreditacion VARCHAR(10) NOT NULL,
    CONSTRAINT fk_analisisHumedad_analisis FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis)
);

CREATE TABLE analisisFibraDietetica(
    idanalisisFibraDietetica INT PRIMARY KEY AUTO_INCREMENT,
    idAnalisis INT NOT NULL,
    resultado NUMERIC(10,2) NOT NULL,
    unidad VARCHAR(20) NOT NULL, 
    metodoReferencia VARCHAR(100) NOT NULL,
    acreditacion VARCHAR(10) NOT NULL,
    CONSTRAINT fk_analisisFibraDietetica_analisis FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis)
);

CREATE TABLE analisisSodio(
    idanalisisSodio INT PRIMARY KEY AUTO_INCREMENT,
    idAnalisis INT NOT NULL,
    resultado NUMERIC(10,2) NOT NULL,
    unidad VARCHAR(20) NOT NULL, 
    metodoReferencia VARCHAR(100) NOT NULL,
    acreditacion VARCHAR(10) NOT NULL,
    CONSTRAINT fk_analisisSodio_analisis FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis)
);

CREATE TABLE analisisCarbohidratos(
    idanalisisCarbohidratos INT PRIMARY KEY AUTO_INCREMENT,
    idAnalisis INT NOT NULL,
    resultado NUMERIC(10,2) NOT NULL,
    unidad VARCHAR(20) NOT NULL, 
    metodoReferencia VARCHAR(100) NOT NULL,
    acreditacion VARCHAR(10) NOT NULL,
    CONSTRAINT fk_analisisSodio_analisis FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis)
);

CREATE TABLE analisisEnergetico(
    idAnalisisEnergetico INT PRIMARY KEY AUTO_INCREMENT,
    idAnalisis INT NOT NULL,
    resultadoKcal NUMERIC(10,2) NOT NULL,
    resultadoKj NUMERIC(10,2) NOT NULL,
    unidadKcal VARCHAR(20) NOT NULL,
    unidadKj VARCHAR(20) NOT NULL,
    metodoReferencia VARCHAR(100) NOT NULL,
    acreditacion VARCHAR(10) NOT NULL,
    CONSTRAINT fk_analisisEnergetico_analisis FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis)
);



CREATE TABLE analisisAcidosGrasos(
    idAnalisisAcidosGrasos INT PRIMARY KEY AUTO_INCREMENT,
    idAnalisis INT NOT NULL,
    resultado NUMERIC(10,2) NOT NULL,
    unidad VARCHAR(20) NOT NULL,
    metodoReferencia VARCHAR(100) NOT NULL,
    acreditacion VARCHAR(10) NOT NULL,
    resultadoTrans NUMERIC(10,2) NOT NULL,
    resultadoSaturadas NUMERIC(10,2) NOT NULL,
    resultadoMonoinsaturados NUMERIC(10,2) NOT NULL,
    resultadoPolyinsaturados NUMERIC(10,2) NOT NULL,
    total NUMERIC(10,2) NOT NULL,
    CONSTRAINT fk_analisisAcidosGrasos_analisis FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis)
);

CREATE TABLE folav (
    idHistorial INT PRIMARY KEY AUTO_INCREMENT,
    idAnalisis INT NOT NULL,
    idUsuario INT NOT NULL,
    fechaGeneracion TIMESTAMP NOT NULL,
    CONSTRAINT fk_folav_analisis FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis)
    CONSTRAINT fk_folav_usuario FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario)
);

CREATE TABLE contenidoNutrimental(
    idContenidoNutrimental INT PRIMARY KEY AUTO_INCREMENT,
    idMuestra INT NOT NULL,
    idAnalisis INT NOT NULL,
    idFolav INT NOT NULL,
    idUsuario INT NOT NULL,
    CONSTRAINT fk_contenidoNutrimental_muestra FOREIGN KEY (idMuestra) REFERENCES muestra(idMuestra),
    CONSTRAINT fk_contenidoNutrimental_analisis FOREIGN KEY (idAnalisis) REFERENCES analisis(idAnalisis),
    CONSTRAINT fk_contenidoNutrimental_folav FOREIGN KEY (idFolav) REFERENCES folav(idFolav),
    CONSTRAINT fk_contenidoNutrimental_usuario FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario)
)