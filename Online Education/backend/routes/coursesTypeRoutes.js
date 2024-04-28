const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { createCourseType, allCourseType, updateCourseType, deleteCourseType } = require('../controllers/coursesTypeController');


//course type routes

// /api/type/create
router.post('/type/create', isAuthenticated, isAdmin, createCourseType)
// /api/type/jobs
router.get('/type/courses', allCourseType)
// /api/type/update/type_id
router.put('/type/update/:type_id', isAuthenticated, isAdmin, updateCourseType)
// /api/type/delete/type_id
router.delete('/type/delete/:type_id', isAuthenticated, isAdmin, deleteCourseType)


module.exports = router;