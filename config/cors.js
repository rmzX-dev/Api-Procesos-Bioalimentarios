import cors from 'cors';

const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requests sin origin (como aplicaciones móviles o Postman)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5173',
      'https://tu-frontend.vercel.app', // Cambia por tu dominio de frontend
      'https://tu-frontend.netlify.app'  // Cambia por tu dominio de frontend
    ];
    
    // Si tienes una variable de entorno específica para CORS
    if (process.env.CORS_ORIGIN) {
      allowedOrigins.push(process.env.CORS_ORIGIN);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'X-Auth-Token'
  ]
};

export default cors(corsOptions);
