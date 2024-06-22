import {
    ASSIGN_EXAM_FAIL,
    ASSIGN_EXAM_REQUEST,
    ASSIGN_EXAM_SUCCESS,
    CLEAR_EXAM_ERRORS,
    GET_ALL_EXAMS_FAIL,
    GET_ALL_EXAMS_REQUEST,
    GET_ALL_EXAMS_SUCCESS,
    LEFT_EXAM_FAIL,
    LEFT_EXAM_REQUEST,
    LEFT_EXAM_SUCCESS,
    LOAD_CANDIDATE_FAIL,
    LOAD_CANDIDATE_REQUIEST,
    LOAD_CANDIDATE_SUCCESS,
    RESET_EXAM_STATE,
    SUBMIT_EXAM_FAIL,
    SUBMIT_EXAM_REQUEST,
    SUBMIT_EXAM_SUCCESS,
    VALIDATE_EXAM_URL_FAIL,
    VALIDATE_EXAM_URL_REQUEST,
    VALIDATE_EXAM_URL_SUCCESS,
} from "../constants/exam.constants";

export const examReducer = (state = {}, action) => {
    switch (action.type) {
        case ASSIGN_EXAM_REQUEST:
        case GET_ALL_EXAMS_REQUEST:
        case VALIDATE_EXAM_URL_REQUEST:
        case LOAD_CANDIDATE_REQUIEST:
        case SUBMIT_EXAM_REQUEST:
        case LEFT_EXAM_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ASSIGN_EXAM_SUCCESS:
        case VALIDATE_EXAM_URL_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
            };
        case LEFT_EXAM_SUCCESS:
            return {
                ...state,
                loading: false,
                leftSuccess: action.payload.success,
                message: action.payload.message,
            };
        case LOAD_CANDIDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                details: action.payload.exam,
            };
        case SUBMIT_EXAM_SUCCESS:
            return {
                ...state,
                loading: false,
                submitSuccess: action.payload.success,
                message: action.payload.message,
                marksObtained: action.payload.totalMarks,
            };
        case GET_ALL_EXAMS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                authenticated: true,
                exams: action.payload.exams,
            };
        case ASSIGN_EXAM_FAIL:
        case GET_ALL_EXAMS_FAIL:
        case VALIDATE_EXAM_URL_FAIL:
        case LOAD_CANDIDATE_FAIL:
        case SUBMIT_EXAM_FAIL:
        case LEFT_EXAM_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case RESET_EXAM_STATE:
            return {
                ...state,
                loading: false,
                success: false,
                message: null,
            };
        case CLEAR_EXAM_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
