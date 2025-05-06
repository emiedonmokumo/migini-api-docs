import dotenv from 'dotenv';
dotenv.config();


export const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Migini API Documentation',
        version: '1.0.0',
        description: 'API documentation for Mingini app',
    },
    servers: [
        {
            url: process.env.API_BASE_URL,
            description: 'API Base URL',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    }
};

export default swaggerDefinition;
