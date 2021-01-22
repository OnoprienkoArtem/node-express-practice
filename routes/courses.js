const {Router} = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/', async (req, res) => {
  const courses = await Course.getAll();

  res.render('courses', {
    title: 'Courses',
    isCourses: true,
    courses
  });
});

router.get(':id', async (req, res) => {
  const courses = await Course.getById(req.params.id);

  res.render('courses', {
    title: `Courses ${course.title}`,
    courses
  });
});

module.exports = router;
