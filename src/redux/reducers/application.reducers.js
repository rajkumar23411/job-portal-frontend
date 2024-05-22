import {
    GET_JOB_APPLICANTS_FAIL,
    GET_JOB_APPLICANTS_REQUEST,
    GET_JOB_APPLICANTS_SUCCESS,
    GET_MY_APPLICATIONS_FAIL,
    GET_MY_APPLICATIONS_REQUEST,
    GET_MY_APPLICATIONS_SUCCESS,
    RESET_APPLICATION_STATE,
    RESET_APPLICATION_STATE_ERROR,
    UPDATE_APPLICATION_STATUS_FAIL,
    UPDATE_APPLICATION_STATUS_REQUEST,
    UPDATE_APPLICATION_STATUS_SUCCESS,
} from "../constants/application.constants";

export const applicationReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_MY_APPLICATIONS_REQUEST:
        case GET_JOB_APPLICANTS_REQUEST:
        case UPDATE_APPLICATION_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_MY_APPLICATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                applications: action.payload.applications,
            };
        case GET_JOB_APPLICANTS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                applicants: action.payload.applications,
            };
        case UPDATE_APPLICATION_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
            };
        case GET_MY_APPLICATIONS_FAIL:
        case GET_JOB_APPLICANTS_FAIL:
        case UPDATE_APPLICATION_STATUS_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };
        case RESET_APPLICATION_STATE:
            return {
                ...state,
                loading: false,
                success: false,
                message: null,
            };
        case RESET_APPLICATION_STATE_ERROR: {
            return {
                ...state,
                loading: false,
                success: false,
                error: null,
            };
        }
        default:
            return state;
    }
};
