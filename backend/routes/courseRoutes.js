const router = require('express').Router();
const {
  getCourses,
  createCourse,
  getCourseById,
} = require('../controllers/courseController');

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', createCourse);

module.exports = router;