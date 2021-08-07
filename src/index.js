import express from 'express';
import path from 'path';
import exphbs from 'express-handlebars';
import routes from './routes';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', (req, res) =>
  res.render('home')
);

app.use(routes);

const server = app.listen(port, () =>
  console.log(`🚀 Server ready at http://localhost:${port}`)
);

server.on('error', () => console.log('Error del servidor'));
