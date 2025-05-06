import express, { Application } from 'express';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { swaggerDefinition } from './config/swagger';
import path from 'path';

dotenv.config();

const app: Application = express();

const options = {
  swaggerDefinition,
  apis: ['./src/swaggerDocs/*.ts'], // Path to the API documentation files
};

// Create swagger spec
const swaggerSpec = swaggerJsdoc(options);

// Middlewares
app.use(express.json())
// app.use(cors()) // configure when FE is connected
app.use(express.urlencoded({
  extended: false
}));

// Serve static Swagger UI assets
app.use('/swagger-static', express.static(path.join(__dirname, 'node_modules', 'swagger-ui-dist')));


app.get('/swagger-static/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Serve Swagger docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


export default app