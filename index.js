const path = require('path');
const express = require('express');
const Handlebars = require('handlebars');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const homeRoutes = require('./routes/home');
const cartRoutes = require('./routes/cart');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');

const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')


const app = express();

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

app.set('view engine', 'hbs');
app.set('views', 'pages');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));

app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/cart', cartRoutes);

async function start() {
  try {
    const url = ``;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e)
  }
}

start();

const PORT = process.env.PORT || 3000;
