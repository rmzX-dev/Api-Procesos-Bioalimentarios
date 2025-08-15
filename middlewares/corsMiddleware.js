// Middleware adicional para manejar CORS de manera más robusta
export const corsMiddleware = (req, res, next) => {
  // Permitir todos los orígenes
  res.header('Access-Control-Allow-Origin', '*');
  
  // Permitir todos los métodos HTTP
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  
  // Permitir todos los headers
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token, Access-Control-Request-Method, Access-Control-Request-Headers');
  
  // Permitir credenciales
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Manejar preflight requests
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  
  next();
};
