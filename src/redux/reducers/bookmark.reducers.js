import {
    CLEAR_BOOKMARK_ERRORS,
    GET_MY_BOOKMARK_FAIL,
    GET_MY_BOOKMARK_REQUEST,
    GET_MY_BOOKMARK_SUCCESS,
    HANDLE_BOOKMARK_FAIL,
    HANDLE_BOOKMARK_REQUEST,
    HANDLE_BOOKMARK_SUCCESS,
    RESET_BOOKMARK_STATE,
} from "../constants/bookmark.constants";

export const bookmarkReducer = (state = {}, action) => {
    switch (action.type) {
        case HANDLE_BOOKMARK_REQUEST:
        case GET_MY_BOOKMARK_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case HANDLE_BOOKMARK_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
            };
        }
        case GET_MY_BOOKMARK_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                bookmarks: action.payload.bookmarks,
            };
        }
        case HANDLE_BOOKMARK_FAIL:
        case GET_MY_BOOKMARK_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
        case RESET_BOOKMARK_STATE: {
            return {
                ...state,
                loading: false,
                message: null,
            };
        }
        case CLEAR_BOOKMARK_ERRORS: {
            return {
                ...state,
                error: null,
            };
        }
        default:
            return state;
    }
};
