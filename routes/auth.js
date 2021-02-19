const {Router} = require('express');
const User = require('../models/user');
const router = Router();

router.get('/login', async (req, res) => {
  res.render('auth/login', {
    title: 'Sign up',
    isLogin: true,
  })
});

router.post('/login', async (req, res) => {
  const user = req.user = await User.findById('6025a8f6c62d7e871e3fc211');
  req.session.user = user;
  req.session.isAuthenticated = true;
  req.session.save(err => {
    if (err) {
      throw err;
    }
    res.redirect('/');
  });
});

router.get('/logout', async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login#login');
  });
});

module.exports = router;
