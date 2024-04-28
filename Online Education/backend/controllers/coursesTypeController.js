const CourseType = require('../models/courseTypeModel');
const ErrorResponse = require('../utils/errorResponse');

//create course category
exports.createCourseType = async (req, res, next) => {
    try {
        const courseT = await CourseType.create({
            courseTypeName: req.body.courseTypeName,
            user: req.user.id
        });
        res.status(201).json({
            success: true,
            courseT
        })
    } catch (error) {
        next(error);
    }
}


//all course categories
exports.allCourseType = async (req, res, next) => {
    try {
        const courseT = await CourseType.find();
        res.status(200).json({
            success: true,
            courseT
        })
    } catch (error) {
        next(error);
    }
}

//update course type
exports.updateCourseType = async (req, res, next) => {
    try {
        const courseT = await CourseType.findByIdAndUpdate(req.params.type_id, req.body, { new: true });
        res.status(200).json({
            success: true,
            courseT
        })
    } catch (error) {
        next(error);
    }
}


//delete course type
exports.deleteCourseType = async (req, res, next) => {
    try {
        const courseT = await CourseType.findByIdAndRemove(req.params.type_id);
        res.status(200).json({
            success: true,
            message: "Job type deleted"
        })
    } catch (error) {
        next(new ErrorResponse("server error", 500));
    }
}
