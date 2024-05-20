import {
    APPLY_JOB_FAIL,
    APPLY_JOB_REQUEST,
    APPLY_JOB_SUCCESS,
    GET_ALL_JOBS_FAIL,
    GET_ALL_JOBS_REQUEST,
    GET_ALL_JOBS_SUCCESS,
    GET_JOB_DETAILS_FAIL,
    GET_JOB_DETAILS_REQUEST,
    GET_JOB_DETAILS_SUCCESS,
    RESET_JOB_STATE,
} from "../constants/jobs.constants";

export const jobsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_JOBS_REQUEST:
        case GET_JOB_DETAILS_REQUEST:
        case APPLY_JOB_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case GET_ALL_JOBS_SUCCESS: {
            return {
                ...state,
                loading: false,
                jobs: action.payload.jobs,
            };
        }
        case GET_JOB_DETAILS_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                job: action.payload.job,
            };
        }
        case APPLY_JOB_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
            };
        }
        case GET_ALL_JOBS_FAIL:
        case GET_JOB_DETAILS_FAIL:
        case APPLY_JOB_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
        case RESET_JOB_STATE: {
            return {
                ...state,
                loading: false,
                error: null,
            };
        }
        default:
            return state;
    }
};
