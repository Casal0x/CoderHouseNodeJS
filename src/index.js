import express from 'express';
import path from 'path';
import routes from './routes';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'public/index.html'))
);

app.use('/api', routes);

const server = app.listen(port, () =>
  console.log(`🚀 Server ready at http://localhost:${port}`)
);

server.on('error', () => console.log('Error del servidor'));
