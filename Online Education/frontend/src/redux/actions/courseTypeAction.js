import axios from 'axios';
import { toast } from 'react-toastify';
import {
    CREATE_COURSE_TYPE_FAIL,
    CREATE_COURSE_TYPE_REQUEST,
    CREATE_COURSE_TYPE_SUCCESS,
    COURSE_TYPE_LOAD_FAIL,
    COURSE_TYPE_LOAD_REQUEST,
    COURSE_TYPE_LOAD_SUCCESS
} from '../constants/courseTypeConstant';


// load courses type
export const courseTypeLoadAction = () => async (dispatch) => {
    dispatch({ type: COURSE_TYPE_LOAD_REQUEST });
    try {
        const { data } = await axios.get('/api/type/courses');
        dispatch({
            type: COURSE_TYPE_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: COURSE_TYPE_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}


// create courses category
export const createCourseTypeAction = (coursetype) => async (dispatch) => {
    dispatch({ type: CREATE_COURSE_TYPE_REQUEST })

    try {
        const { data } = await axios.post("/api/type/create", coursetype)
        dispatch({
            type: CREATE_COURSE_TYPE_SUCCESS,
            payload: data
        })
        toast.success("Course type created successfully");


    } catch (error) {
        dispatch({
            type: CREATE_COURSE_TYPE_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);

    }
}