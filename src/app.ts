import fs from 'fs';
import path from 'path';
import express from 'express';
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
dotenv.config();

import swaggerOptions from './config/swagger';

const app = express();

// Create swagger spec
const swaggerSpec = swaggerJsdoc(swaggerOptions);


// Serve static Swagger UI assets
app.use('/swagger-static', express.static(path.join(__dirname, 'node_modules', 'swagger-ui-dist')));


app.get('/swagger-static/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Serve Swagger docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


export default app;