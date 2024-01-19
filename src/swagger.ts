import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Fazendas',
      version: '1.0.0',
      description: 'API para gerenciamento de fazendas',
    },
    servers: [
      {
        url: 'http://localhost:3000', 
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/controllers/*.ts', './src/models/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };