const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { createCourse, singleCourse, updateCourse, showCourses } = require('../controllers/coursesController');



//jobs routes

// /api/course/create
router.post('/course/create', isAuthenticated, isAdmin, createCourse);
// /api/course/id
router.get('/course/:id', isAuthenticated, singleCourse);
// /api/course/update/course_id
router.put('/course/update/:course_id', isAuthenticated, isAdmin, updateCourse);
// /api/courses/show?pageNumber=1&keyword=&cat=
router.get('/courses/show', showCourses);



module.exports = router;