import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();


export const swaggerOptions = {
    definition: {
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
    },
    apis: ['./src/**/*.ts'], // Use __dirname for absolute path
};

export default swaggerOptions;
