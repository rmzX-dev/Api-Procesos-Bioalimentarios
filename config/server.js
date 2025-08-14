// Configuración del servidor para producción
export const serverConfig = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0',
  timeout: 30000, // 30 segundos
  keepAlive: true,
  keepAliveTimeout: 65000,
  headersTimeout: 66000
};

// Configuración de rate limiting (opcional)
export const rateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por ventana
  message: 'Demasiadas requests desde esta IP, intenta de nuevo más tarde'
};

// Configuración de compresión (opcional)
export const compressionConfig = {
  level: 6,
  threshold: 1024
};
