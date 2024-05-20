import {
    COMPANY_LOGOUT_FAIL,
    COMPANY_LOGOUT_REQUEST,
    COMPANY_LOGOUT_SUCCESS,
    CREATE_JOB_FAIL,
    CREATE_JOB_REQUEST,
    CREATE_JOB_SUCCESS,
    LOAD_COMPANY_FAIL,
    LOAD_COMPANY_REQUEST,
    LOAD_COMPANY_SUCCESS,
    LOAD_JOBS_FAIL,
    LOAD_JOBS_REQUEST,
    LOAD_JOBS_SUCCESS,
    LOAD_SINGLE_JOB_FAIL,
    LOAD_SINGLE_JOB_REQUEST,
    LOAD_SINGLE_JOB_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    RESET_COMPANY,
    SIGN_UP_FAIL,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    UPDATE_JOB_FAIL,
    UPDATE_JOB_REQUEST,
    UPDATE_JOB_SUCCESS,
} from "../constants/company.constants";

export const companyReducer = (state = {}, action) => {
    switch (action.type) {
        case SIGN_UP_REQUEST:
        case LOGIN_REQUEST:
        case LOAD_COMPANY_REQUEST:
        case CREATE_JOB_REQUEST:
        case LOAD_JOBS_REQUEST:
        case LOAD_SINGLE_JOB_REQUEST:
        case UPDATE_JOB_REQUEST:
        case COMPANY_LOGOUT_REQUEST: {
            return {
                ...state,
                loading: true,
                success: false,
            };
        }
        case SIGN_UP_SUCCESS:
        case CREATE_JOB_SUCCESS:
        case UPDATE_JOB_SUCCESS:
        case COMPANY_LOGOUT_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
            };
        }
        case LOAD_COMPANY_SUCCESS:
        case LOGIN_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                data: action.payload.company,
            };
        }
        case LOAD_JOBS_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                jobs: action.payload.jobs,
            };
        }
        case LOAD_SINGLE_JOB_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                job: action.payload.job,
            };
        }
        case SIGN_UP_FAIL:
        case LOGIN_FAIL:
        case LOAD_COMPANY_FAIL:
        case CREATE_JOB_FAIL:
        case LOAD_JOBS_FAIL:
        case LOAD_SINGLE_JOB_FAIL:
        case UPDATE_JOB_FAIL:
        case COMPANY_LOGOUT_FAIL: {
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };
        }
        case RESET_COMPANY: {
            return {
                ...state,
                message: null,
                success: null,
                error: null,
            };
        }
        default:
            return state;
    }
};
