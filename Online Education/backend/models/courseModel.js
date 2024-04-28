const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const commentSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    comment: {
        type: String,
        trim: true,
        required: [true, 'comment cannot be empty'],
        maxlength: 200,
        default: "",
    },

}, { timestamps: true });


const courseSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: [true, 'Title is required'],
        maxlength: 70,
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Description is required'],
    },
    courseType: {
        type: ObjectId,
        ref: "CourseType",
        required: true
    },
    likes: {
        type: Map,
        of: Boolean,
    },
    comment: [commentSchema],
    picturePath: {
        type: String,
        trim: true,
        required: [true, 'picturePath is required'],
    },
    videoPath: {
        type: String,
        trim: true,
        required: [true, 'videoPath is required'],
    },
    theory: {
        type: String,
        required: [true, 'theory is required'],
    },
}, { timestamps: true });


module.exports = mongoose.model("Course", courseSchema);
