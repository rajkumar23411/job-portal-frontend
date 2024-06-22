import axios from "axios";
import {
    CREATE_QUESTION_SET_FAIL,
    CREATE_QUESTION_SET_REQUEST,
    CREATE_QUESTION_SET_SUCCESS,
    DELETE_QUESTION_SET_FAIL,
    DELETE_QUESTION_SET_REQUEST,
    DELETE_QUESTION_SET_SUCCESS,
    GET_QUESTION_SETS_FAIL,
    GET_QUESTION_SETS_REQUEST,
    GET_QUESTION_SETS_SUCCESS,
    LOAD_QUESTION_SET_DETAILS_FAIL,
    LOAD_QUESTION_SET_DETAILS_REQUEST,
    LOAD_QUESTION_SET_DETAILS_SUCCESS,
} from "../constants/question.constants";
import { config, questionBaseURL } from "@/utils";

export const createQuestionSet = (formData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_QUESTION_SET_REQUEST });
        const { data } = await axios.post(
            `${questionBaseURL}/create`,
            formData,
            config
        );
        dispatch({ type: CREATE_QUESTION_SET_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_QUESTION_SET_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getQuestionSets =
    (category = "") =>
    async (dispatch) => {
        try {
            dispatch({ type: GET_QUESTION_SETS_REQUEST });
            let apiURL = `${questionBaseURL}/sets/load`;

            if (category) {
                apiURL += `?category=${category}`;
            }
            const { data } = await axios.get(apiURL, config);
            dispatch({ type: GET_QUESTION_SETS_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: GET_QUESTION_SETS_FAIL,
                payload: error.response.data.message,
            });
        }
    };

export const getSingleQuestionSet = (id) => async (dispatch) => {
    try {
        dispatch({ type: LOAD_QUESTION_SET_DETAILS_REQUEST });
        const { data } = await axios.get(
            `${questionBaseURL}/set/load/${id}`,
            config
        );
        dispatch({ type: LOAD_QUESTION_SET_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: LOAD_QUESTION_SET_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const deleteQuestionSet = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_QUESTION_SET_REQUEST });
        const { data } = await axios.delete(
            `${questionBaseURL}/set/delete/${id}`,
            config
        );
        dispatch({ type: DELETE_QUESTION_SET_SUCCESS, payload: data });
    } catch (error) {
        console.log(error.response.data.originalError);
        dispatch({
            type: DELETE_QUESTION_SET_FAIL,
            payload: error.response.data.message,
        });
    }
};
