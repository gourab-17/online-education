import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadCourseReducer, loadCourseSingleReducer, registerAcourseReducer } from './reducers/courseReducer';
import { createCourseTypeReducer, loadCourseTypeReducer } from './reducers/courseTypeReducer';
import {
    allUserReducer,
    userApplyCourseReducer,
    userReducerLogout,
    userReducerProfile,
    userReducerSignIn,
    userReducerSignUp
} from './reducers/userReducer';
import { modeReducer } from './reducers/themeModeReducer';

//combine reducers
const reducer = combineReducers({
    loadCourses: loadCourseReducer,
    courseTypeAll: loadCourseTypeReducer,
    signIn: userReducerSignIn,
    logOut: userReducerLogout,
    userProfile: userReducerProfile,
    singleCourse: loadCourseSingleReducer,
    userCourseApplication: userApplyCourseReducer,
    allUsers: allUserReducer,
    signUp: userReducerSignUp,
    mode: modeReducer,
    registerCourse: registerAcourseReducer,
    createCourseType: createCourseTypeReducer

});


//initial state
let initialState = {
    signIn: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    },
    mode: {
        mode: "light"
    }
};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store;