import express from 'express';
import path from 'path';
import routes from './routes';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => res.render('home'));

app.use(routes);

const server = app.listen(port, () =>
  console.log(`🚀 Server ready at http://localhost:${port}`)
);

server.on('error', () => console.log('Error del servidor'));
