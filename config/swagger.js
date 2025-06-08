const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'INTEGRATIVE PROJECT API.',
            version: '1.0.0', 
            description: 'Api Procesos BioAlimentarios',
        },
        servers: [
            {
                url: 'http://localhost:'+process.env.PORT ,
            },
        ],
    },
    apis: ['./app/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve,
        swaggerUi.setup(swaggerSpec));
        console.log('Swagger docs available at http://localhost:'+
            process.env.PORT+'/api-docs');
};

module.exports = swaggerDocs;