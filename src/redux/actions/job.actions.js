import { config, jobBaseURL } from "@/utils";
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
} from "../constants/jobs.constants";
import axios from "axios";

export const getAllJobs = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_JOBS_REQUEST });
        const { data } = await axios.get(`${jobBaseURL}/all`, config);
        dispatch({ type: GET_ALL_JOBS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_ALL_JOBS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getJobDetials = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_JOB_DETAILS_REQUEST });
        const { data } = await axios.get(`${jobBaseURL}/details/${id}`, config);
        dispatch({ type: GET_JOB_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_JOB_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const applyJob = (id) => async (dispatch) => {
    try {
        dispatch({ type: APPLY_JOB_REQUEST });
        const { data } = await axios.post(
            `${jobBaseURL}/apply/${id}`,
            {},
            config
        );
        dispatch({ type: APPLY_JOB_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: APPLY_JOB_FAIL,
            payload: error.response.data.message,
        });
    }
};
