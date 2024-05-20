import axios from "axios";
import {
    GET_MY_BOOKMARK_FAIL,
    GET_MY_BOOKMARK_REQUEST,
    GET_MY_BOOKMARK_SUCCESS,
    HANDLE_BOOKMARK_FAIL,
    HANDLE_BOOKMARK_REQUEST,
    HANDLE_BOOKMARK_SUCCESS,
} from "../constants/bookmark.constants";
import { config, jobBaseURL } from "@/utils";

export const handleBookmarkRequest = (id) => async (dispatch) => {
    try {
        dispatch({ type: HANDLE_BOOKMARK_REQUEST });
        const { data } = await axios.post(
            `${jobBaseURL}/bookmark/${id}`,
            {},
            config
        );
        dispatch({ type: HANDLE_BOOKMARK_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: HANDLE_BOOKMARK_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const loadBookmarks = () => async (dispatch) => {
    try {
        dispatch({ type: GET_MY_BOOKMARK_REQUEST });
        const { data } = await axios.get(`${jobBaseURL}/my/bookmarks`, config);
        dispatch({ type: GET_MY_BOOKMARK_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_MY_BOOKMARK_FAIL,
            payload: error.response.data.message,
        });
    }
};
