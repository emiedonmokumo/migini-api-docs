import { IncomingMessage, ServerResponse } from 'http';
import { swaggerDefinition } from './config/swagger';
import path from 'path';
import fs from 'fs';
import { getAbsoluteFSPath } from 'swagger-ui-dist';

const swaggerDistPath = getAbsoluteFSPath();

const app = (req: IncomingMessage, res: ServerResponse) => {
  const { url, method } = req;

  if (url === '/api/docs' && method === 'GET') {
    // Serve the Swagger UI HTML page
    const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Swagger UI</title>
    <link rel="stylesheet" type="text/css" href="/api/docs/swagger-ui.css" />
    <link rel="icon" type="image/png" href="/api/docs/favicon-32x32.png" />
    <style>
      html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
      *, *:before, *:after { box-sizing: inherit; }
      body { margin:0; background: #fafafa; }
    </style>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="/api/docs/swagger-ui-bundle.js"></script>
    <script src="/api/docs/swagger-ui-standalone-preset.js"></script>
    <script>
      window.onload = function () {
        window.ui = SwaggerUIBundle({
          url: '/api/docs/swagger.json',
          dom_id: '#swagger-ui',
          deepLinking: true,
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
          ],
          layout: "StandaloneLayout"
        });
      };
    </script>
  </body>
  </html>
`;

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else if (url === '/api/docs/swagger.json' && method === 'GET') {
    // Serve your OpenAPI spec as JSON
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(swaggerDefinition));
  } else if (url?.startsWith('/api/docs/') && method === 'GET') {
    // Serve static Swagger UI assets (like JS, CSS, favicon)
    const filePath = path.join(swaggerDistPath, url.replace('/api/docs/', ''));
    if (fs.existsSync(filePath)) {
      const fileStream = fs.createReadStream(filePath);
      const ext = path.extname(filePath).toLowerCase();
      const contentTypeMap: Record<string, string> = {
        '.js': 'application/javascript',
        '.map': 'application/json',
        '.css': 'text/css',
        '.png': 'image/png',
        '.html': 'text/html',
      };
      res.writeHead(200, {
        'Content-Type': contentTypeMap[ext] || 'application/octet-stream',
      });
      fileStream.pipe(res);
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
};


export default app;