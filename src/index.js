import express from 'express';
import path from 'path';
import * as url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const frontend_dir = path.join(__dirname, '../frontend/');

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: frontend_dir });
});

app.listen(port);
console.log('Server started at http://localhost:' + port);
