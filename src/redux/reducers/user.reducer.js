import {
    EDIT_PREFERENCE_FAIL,
    EDIT_PREFERENCE_REQUEST,
    EDIT_PREFERENCE_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    RESEND_VERIFICATION_CODE_FAIL,
    RESEND_VERIFICATION_CODE_REQUEST,
    RESEND_VERIFICATION_CODE_SUCCESS,
    RESET_ACCOUNT,
    RESET_USER,
    SIGN_IN_USER_FAIL,
    SIGN_IN_USER_REQUEST,
    SIGN_IN_USER_SUCCESS,
    SIGN_UP_FAIL,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    UPDATE_EMAIL_FAIL,
    UPDATE_EMAIL_REQUEST,
    UPDATE_EMAIL_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    VERIFY_ACCOUNT_FAIL,
    VERIFY_ACCOUNT_REQUEST,
    VERIFY_ACCOUNT_SUCCESS,
} from "../constants/user.constants";
import { CLEAR_ERRORS } from "../constants/error.constant";
import { UPDATE_PROFILE_SUCCESS } from "./../constants/user.constants";

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case SIGN_UP_REQUEST:
        case SIGN_IN_USER_REQUEST:
        case LOAD_USER_REQUEST: {
            return {
                ...state,
                loading: true,
                success: false,
            };
        }
        case SIGN_UP_SUCCESS:
        case SIGN_IN_USER_SUCCESS:
        case LOAD_USER_SUCCESS: {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                success: action.payload.success,
                message: action.payload.message,
            };
        }
        case SIGN_UP_FAIL:
        case SIGN_IN_USER_FAIL:
        case LOAD_USER_FAIL: {
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: action.payload,
                success: false,
            };
        }

        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null,
            };
        }
        case RESET_USER: {
            return {
                ...state,
                loading: false,
                success: false,
                error: null,
                message: null,
            };
        }
        default:
            return state;
    }
};

export const accountReducer = (state = {}, action) => {
    switch (action.type) {
        case VERIFY_ACCOUNT_REQUEST:
            return {
                ...state,
                isVerifying: true,
            };
        case RESEND_VERIFICATION_CODE_REQUEST: {
            return {
                ...state,
                isSending: true,
            };
        }
        case VERIFY_ACCOUNT_SUCCESS: {
            return {
                ...state,
                isVerifying: false,
                success: action.payload.success,
                message: action.payload.message,
            };
        }
        case RESEND_VERIFICATION_CODE_SUCCESS: {
            return {
                ...state,
                isSending: false,
                success: action.payload.success,
                message: action.payload.message,
            };
        }
        case VERIFY_ACCOUNT_FAIL: {
            return {
                ...state,
                isVerifying: false,
                success: false,
                error: action.payload,
            };
        }
        case RESEND_VERIFICATION_CODE_FAIL: {
            return {
                ...state,
                isSending: false,
                success: false,
                error: action.payload,
            };
        }
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_EMAIL_REQUEST:
        case EDIT_PREFERENCE_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_EMAIL_SUCCESS:
        case EDIT_PREFERENCE_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
            };
        }
        case UPDATE_PROFILE_FAIL:
        case UPDATE_EMAIL_FAIL:
        case EDIT_PREFERENCE_FAIL: {
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };
        }
        case RESET_ACCOUNT: {
            return {
                ...state,
                loading: false,
                isVerifying: false,
                isSending: false,
                success: false,
                message: undefined,
            };
        }
        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null,
            };
        }
        default:
            return state;
    }
};
