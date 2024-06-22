import axios from "axios";
import {
    ASSIGN_EXAM_FAIL,
    ASSIGN_EXAM_REQUEST,
    ASSIGN_EXAM_SUCCESS,
    GET_ALL_EXAMS_FAIL,
    GET_ALL_EXAMS_REQUEST,
    GET_ALL_EXAMS_SUCCESS,
    LEFT_EXAM_FAIL,
    LEFT_EXAM_REQUEST,
    LEFT_EXAM_SUCCESS,
    LOAD_CANDIDATE_FAIL,
    LOAD_CANDIDATE_REQUIEST,
    LOAD_CANDIDATE_SUCCESS,
    SUBMIT_EXAM_FAIL,
    SUBMIT_EXAM_REQUEST,
    SUBMIT_EXAM_SUCCESS,
    VALIDATE_EXAM_URL_FAIL,
    VALIDATE_EXAM_URL_REQUEST,
    VALIDATE_EXAM_URL_SUCCESS,
} from "../constants/exam.constants";
import { config, examBaseURL } from "@/utils";

export const assignExam = (formData) => async (dispatch) => {
    try {
        dispatch({ type: ASSIGN_EXAM_REQUEST });

        const { data } = await axios.post(
            `${examBaseURL}/assign`,
            formData,
            config
        );

        dispatch({ type: ASSIGN_EXAM_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ASSIGN_EXAM_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const loadAllAssignedExams =
    (status = "") =>
    async (dispatch) => {
        try {
            dispatch({ type: GET_ALL_EXAMS_REQUEST });
            let url = `${examBaseURL}/company/all`;

            if (status) {
                url += `?status=${status}`;
            }

            const { data } = await axios.get(url, config);
            dispatch({ type: GET_ALL_EXAMS_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: GET_ALL_EXAMS_FAIL,
                payload: error.response.data.message,
            });
        }
    };

export const validateAccess = (token, auth) => async (dispatch) => {
    try {
        dispatch({ type: VALIDATE_EXAM_URL_REQUEST });

        const { data } = await axios.get(
            `${examBaseURL}/validate-access?token=${token}&auth=${auth}`,
            config
        );

        dispatch({ type: VALIDATE_EXAM_URL_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: VALIDATE_EXAM_URL_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getCandidateDetails = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_CANDIDATE_REQUIEST });
        const { data } = await axios.get(
            `${examBaseURL}/candidate/load`,
            config
        );
        dispatch({ type: LOAD_CANDIDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: LOAD_CANDIDATE_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const submitExam = (formData) => async (dispatch) => {
    try {
        dispatch({ type: SUBMIT_EXAM_REQUEST });

        const { data } = await axios.post(
            `${examBaseURL}/submit`,
            formData,
            config
        );

        dispatch({ type: SUBMIT_EXAM_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SUBMIT_EXAM_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const leaveExam = () => async (dispatch) => {
    try {
        dispatch({ type: LEFT_EXAM_REQUEST });
        const { data } = await axios.get(`${examBaseURL}/left`, config);
        dispatch({ type: LEFT_EXAM_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: LEFT_EXAM_FAIL,
            payload: error.response.data.message,
        });
    }
};
