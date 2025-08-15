import cors from 'cors';

const corsOptions = {
  origin: '*', // Permitir todos los orígenes
  credentials: false, // Cambiar a false para permitir todos los orígenes
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'X-Auth-Token',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers'
  ],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

export default cors(corsOptions);
