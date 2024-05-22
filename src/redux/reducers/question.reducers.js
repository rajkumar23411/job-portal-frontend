import {
    CREATE_QUESTION_SET_FAIL,
    CREATE_QUESTION_SET_REQUEST,
    CREATE_QUESTION_SET_SUCCESS,
    GET_QUESTION_SETS_FAIL,
    GET_QUESTION_SETS_REQUEST,
    GET_QUESTION_SETS_SUCCESS,
    LOAD_QUESTION_SET_DETAILS_FAIL,
    LOAD_QUESTION_SET_DETAILS_REQUEST,
    LOAD_QUESTION_SET_DETAILS_SUCCESS,
    RESET_QUESTION_ERRORS,
    RESET_QUESTION_STATE,
} from "../constants/question.constants";

export const questionReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_QUESTION_SET_REQUEST:
        case GET_QUESTION_SETS_REQUEST:
        case LOAD_QUESTION_SET_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_QUESTION_SET_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
            };
        case GET_QUESTION_SETS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                questionSets: action.payload.questionSets,
            };
        case LOAD_QUESTION_SET_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                questionSet: action.payload.questionSet,
            };
        case CREATE_QUESTION_SET_FAIL:
        case GET_QUESTION_SETS_FAIL:
        case LOAD_QUESTION_SET_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                message: action.payload.message,
            };
        case RESET_QUESTION_STATE:
            return {
                ...state,
                loading: false,
                success: false,
                message: null,
            };
        case RESET_QUESTION_ERRORS:
            return {
                ...state,
                loading: false,
                success: false,
                error: null,
            };
        default:
            return state;
    }
};
