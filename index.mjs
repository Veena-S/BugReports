import express from 'express';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';

import routes from './routes.mjs';

const app = express();

app.use(cookieParser());

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

app.use(methodOverride('_method'));

// This is to accept POST request send through Axios.
// This tells the Express the request bosy is send as JSON
app.use(express.json());

// set the routes
routes( app );

const PORT = process.env.PORT || 3004;
console.log(PORT);
app.listen(PORT);
