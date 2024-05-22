import { config, jobBaseURL } from "@/utils";
import {
    APPLY_JOB_FAIL,
    APPLY_JOB_REQUEST,
    APPLY_JOB_SUCCESS,
    GET_ALL_JOBS_FAIL,
    GET_ALL_JOBS_REQUEST,
    GET_ALL_JOBS_SUCCESS,
    GET_JOB_AS_PER_PREFERENCE_FAIL,
    GET_JOB_AS_PER_PREFERENCE_REQUEST,
    GET_JOB_AS_PER_PREFERENCE_SUCCESS,
    GET_JOB_DETAILS_FAIL,
    GET_JOB_DETAILS_REQUEST,
    GET_JOB_DETAILS_SUCCESS,
} from "../constants/jobs.constants";
import axios from "axios";

export const getAllJobs =
    (
        profile = [],
        location = [],
        jobType = "",
        workMode = "",
        experience = "",
        page = 1
    ) =>
    async (dispatch) => {
        try {
            dispatch({ type: GET_ALL_JOBS_REQUEST });

            let apiURL = `${jobBaseURL}/all?page=${page}`;

            if (profile.length > 0) {
                apiURL += `&profile=${profile.join(",")}`;
            }
            if (location.length > 0) {
                apiURL += `&locations=${location.join(",")}`;
            }
            if (jobType) {
                apiURL += `&jobType=${jobType}`;
            }
            if (workMode) {
                apiURL += `&workMode=${workMode}`;
            }
            if (experience) {
                apiURL += `&experience=${experience}`;
            }

            const { data } = await axios.get(apiURL, config);
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

export const getJobAsPerPreference = () => async (dispatch) => {
    try {
        dispatch({ type: GET_JOB_AS_PER_PREFERENCE_REQUEST });
        const { data } = await axios.get(`${jobBaseURL}/preference`, config);
        dispatch({ type: GET_JOB_AS_PER_PREFERENCE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_JOB_AS_PER_PREFERENCE_FAIL,
            payload: error.response.data.message,
        });
    }
};
