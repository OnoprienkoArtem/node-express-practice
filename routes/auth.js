const {Router} = require('express');
const router = Router();

router.get('/login', async (req, res) => {
  res.render('auth/login', {
    title: 'Sign up',
    isLogin: true,
  })
});

module.exports = router;
