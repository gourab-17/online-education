const Course = require('../models/courseModel');
const CourseType = require('../models/courseTypeModel');
const ErrorResponse = require('../utils/errorResponse');

//create course
exports.createCourse = async (req, res, next) => {
    try {
        const course = await Course.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            courseType: req.body.courseType,
            likes: {},
            comment: [],
            picturePath: req.body.picturePath,
            videoPath: req.body.videoPath,
            theory: req.body.theory

        });
        res.status(201).json({
            success: true,
            course
        })
    } catch (error) {
        next(error);
    }
}


//single course
exports.singleCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);
        res.status(200).json({
            success: true,
            course
        })
    } catch (error) {
        next(error);
    }
}


//update course by id.
exports.updateCourse = async (req, res, next) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.course_id, req.body, { new: true }).populate('courseType', 'courseTypeName').populate('user', 'firstName lastName');
        res.status(200).json({
            success: true,
            course
        })
    } catch (error) {
        next(error);
    }
}


//show courses
exports.showCourses = async (req, res, next) => {

    //enable search 
    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}


    // filter courses by category ids
    let ids = [];
    const courseTypeCategory = await CourseType.find({}, { _id: 1 });
    courseTypeCategory.forEach(cat => {
        ids.push(cat._id);
    })

    let cat = req.query.cat;
    let categ = cat !== '' ? cat : ids;


    //enable pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    //const count = await Course.find({}).estimatedDocumentCount();
    const count = await Course.find({ ...keyword, courseType: categ }).countDocuments();

    try {
        const courses = await Course.find({ ...keyword, courseType: categ }).sort({ createdAt: -1 }).populate('courseType', 'courseTypeName').populate('user', 'firstName').skip(pageSize * (page - 1)).limit(pageSize)
        res.status(200).json({
            success: true,
            courses,
            page,
            pages: Math.ceil(count / pageSize),
            count
        })
    } catch (error) {
        next(error);
    }
}





