const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');

//load all users
exports.allUsers = async (req, res, next) => {
    //enable pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await User.find({}).estimatedDocumentCount();

    try {
        const users = await User.find().sort({ createdAt: -1 }).select('-password')
            .skip(pageSize * (page - 1))
            .limit(pageSize)

        res.status(200).json({
            success: true,
            users,
            page,
            pages: Math.ceil(count / pageSize),
            count

        })
        next();
    } catch (error) {
        return next(error);
    }
}

//show single user
exports.singleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            user
        })
        next();

    } catch (error) {
        return next(error);
    }
}


//edit user
exports.editUser = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to edit this user."
            });
        }
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            user
        })
        next();

    } catch (error) {
        return next(error);
    }
}

//delete user
exports.deleteUser = async (req, res, next) => {
    try {
        const userToDelete = await User.findById(req.params.id);

        // Check if the user exists
        if (!userToDelete) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }
        if (userToDelete.role === 1) {
            return res.status(403).json({
                success: false,
                message: "Users with admin role cannot be deleted."
            });
        }
        const user = await User.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success: true,
            message: "user deleted"
        })
        next();

    } catch (error) {
        return next(error);
    }
}


//Courses history
exports.createUserCoursesHistory = async (req, res, next) => {
    const { title, description, courseId } = req.body;

    try {
        const currentUser = await User.findOne({ _id: req.user._id });

        if (!currentUser) {
            return next(new ErrorResponse("You must log In", 401));
        } else {
            // Check if the course history with the given courseId already exists
            const courseHistoryExists = currentUser.coursesHistory.some(
                history => history.courseId === courseId
            );

            if (courseHistoryExists) {
                return res.status(400).json({
                    success: false,
                    error: "Bookmark already exists for this Course",
                });
            } else {
                const addCourseHistory = {
                    title,
                    description,
                    user: req.user._id,
                    courseId
                };

                currentUser.coursesHistory.push(addCourseHistory);
                await currentUser.save();
            }
        }

        res.status(200).json({
            success: true,
            currentUser
        });
        next();

    } catch (error) {
        return next(error);
    }
};








