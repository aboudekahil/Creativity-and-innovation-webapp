import express from 'express';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const basedir = path.join(__dirname, '..');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(basedir, 'frontend', 'index.html'));
});

app.listen(port);
console.log(`Server started at http://localhost:${port}`);

app.use(express.static('frontend'));
