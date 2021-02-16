const path = require('path');
const express = require('express');
const Handlebars = require('handlebars');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const homeRoutes = require('./routes/home');
const cartRoutes = require('./routes/cart');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const ordersRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');

const User = require('./models/user');

const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');


const app = express();

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

app.set('view engine', 'hbs');
app.set('views', 'pages');

app.use(async (req, res, next) => {
  try {
    req.user = await User.findById('6025a8f6c62d7e871e3fc211');
    next();
  } catch (e) {
    console.log(e);
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));

app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', ordersRoutes);
app.use('/auth', authRoutes);

async function start() {
  try {
    const url = `mongodb+srv://dbArt:gznpBtapWTacjN7Q@cluster0.lzbkv.mongodb.net/shop`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    const candidate = await User.findOne();
    if (!candidate) {
      const user = new User({
        email: 'art@m.com',
        name: 'Art',
        cart: {
          items: []
        }
      });

      await user.save();
    }
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e)
  }
}

start();

const PORT = process.env.PORT || 3000;
