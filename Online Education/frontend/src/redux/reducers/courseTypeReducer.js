import {
    CREATE_COURSE_TYPE_FAIL,
    CREATE_COURSE_TYPE_REQUEST,
    CREATE_COURSE_TYPE_RESET,
    CREATE_COURSE_TYPE_SUCCESS,
    COURSE_TYPE_LOAD_FAIL,
    COURSE_TYPE_LOAD_REQUEST,
    COURSE_TYPE_LOAD_RESET,
    COURSE_TYPE_LOAD_SUCCESS
} from "../constants/courseTypeConstant"

// load course type reducer
export const loadCourseTypeReducer = (state = { courseType: [] }, action) => {
    switch (action.type) {
        case COURSE_TYPE_LOAD_REQUEST:
            return { loading: true }
        case COURSE_TYPE_LOAD_SUCCESS:
            return {
                loading: false,
                courseType: action.payload.courseT
            }
        case COURSE_TYPE_LOAD_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case COURSE_TYPE_LOAD_RESET:
            return {}
        default:
            return state;
    }
}

// create course type reducer
export const createCourseTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_COURSE_TYPE_REQUEST:
            return { loading: true }
        case CREATE_COURSE_TYPE_SUCCESS:
            return {
                loading: false,
                courseType: action.payload,
            }
        case CREATE_COURSE_TYPE_FAIL:
            return { loading: false, error: action.payload }
        case CREATE_COURSE_TYPE_RESET:
            return {}
        default:
            return state;
    }

}