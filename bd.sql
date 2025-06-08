CREATE TABLE usuarios (
    idUsuario INT PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL,
    apellidoPaterno VARCHAR(40) NOT NULL,
    apellidoMaterno VARCHAR(40),
    fechaNacimiento DATE NOT NULL,
    correo VARCHAR(50) NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL
);

CREATE TABLE clientes (
    idCliente INT PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL,
    apellidoPaterno VARCHAR(40) NOT NULL,
    apellidoMaterno VARCHAR(40),
    razonSocial VARCHAR(200) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    metodo VARCHAR(255) NOT NULL,
    acreditacion VARCHAR(255) NOT NULL
);


CREATE TABLE bitacora (
    idBitacora INT PRIMARY KEY,
    idUsuario INT NOT NULL,
    idCliente INT NOT NULL,
    accion VARCHAR(50) NOT NULL,
    fechaRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    detalles TEXT,
    CONSTRAINT fk_bitacora_usuario FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario),
    CONSTRAINT fk_bitacora_cliente FOREIGN KEY (idCliente) REFERENCES clientes(idCliente)
);

CREATE TABLE muestra (
    idMuestra INT PRIMARY KEY,
    idCliente INT NOT NULL,
    folio VARCHAR(20) UNIQUE NOT NULL,
    descripcion TEXT NOT NULL,
    fechaMuestreo DATE NOT NULL,
    fechaRecepcion DATE NOT NULL,
    temperatura DECIMAL(5,2) NOT NULL,
    CONSTRAINT fk_muestra_cliente FOREIGN KEY (idCliente) REFERENCES clientes(idCliente)
);

CREATE TABLE humedad (
    idHumedad INT PRIMARY KEY,
    idMuestra INT NOT NULL,
    resultado DECIMAL(10,4) NOT NULL,
    unidad VARCHAR(20) NOT NULL,
    fechaAnalisis DATE NOT NULL,
    CONSTRAINT fk_humedad_muestra FOREIGN KEY (idMuestra) REFERENCES muestra(idMuestra)
);

CREATE TABLE proteina (
    idProteina INT PRIMARY KEY,
    idMuestra INT NOT NULL,
    resultado DECIMAL(10,4) NOT NULL,
    unidad VARCHAR(20) NOT NULL,
    fechaAnalisis DATE NOT NULL,
    CONSTRAINT fk_proteina_muestra FOREIGN KEY (idMuestra) REFERENCES muestra(idMuestra)
);

CREATE TABLE ceniza (
    idCeniza INT PRIMARY KEY,
    idMuestra INT NOT NULL,
    resultado DECIMAL(10,4) NOT NULL,
    unidad VARCHAR(20) NOT NULL,
    fechaAnalisis DATE NOT NULL,
    CONSTRAINT fk_ceniza_muestra FOREIGN KEY (idMuestra) REFERENCES muestra(idMuestra)
);

CREATE TABLE analisis (
    idAnalisis INT PRIMARY KEY,
    idMuestra INT NOT NULL,
    idAnalista INT NOT NULL,
    tipoAnalisis VARCHAR(50) NOT NULL,
    resultado DECIMAL(10,4) NOT NULL,
    unidad VARCHAR(20) NOT NULL,
    CONSTRAINT fk_analisis_muestra FOREIGN KEY (idMuestra) REFERENCES muestra(idMuestra),
    CONSTRAINT fk_analisis_analista FOREIGN KEY (idAnalista) REFERENCES usuarios(idUsuario)
);

CREATE TABLE historialPdf (
    idHistorial INT PRIMARY KEY,
    idMuestra INT NOT NULL,
    idUsuario INT NOT NULL,
    fechaGeneracion TIMESTAMP NOT NULL,
    CONSTRAINT fk_historialPdf_muestra FOREIGN KEY (idMuestra) REFERENCES muestra(idMuestra),
    CONSTRAINT fk_historialPdf_usuario FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario)
);

