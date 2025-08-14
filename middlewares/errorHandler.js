// Middleware para manejo de errores
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Error de validación
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Error de validación',
      message: err.message,
      details: err.details
    });
  }

  // Error de JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Token inválido',
      message: 'El token de autenticación no es válido'
    });
  }

  // Error de base de datos
  if (err.code === '23505') { // Unique violation
    return res.status(409).json({
      error: 'Conflicto',
      message: 'El recurso ya existe'
    });
  }

  // Error por defecto
  res.status(err.status || 500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'production' 
      ? 'Algo salió mal' 
      : err.message
  });
};

// Middleware para rutas no encontradas
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: `La ruta ${req.originalUrl} no existe`,
    availableRoutes: [
      '/',
      '/health',
      '/api-docs',
      '/api/*'
    ]
  });
};
