import axios from "axios";
import {
    GET_JOB_APPLICANTS_FAIL,
    GET_JOB_APPLICANTS_REQUEST,
    GET_JOB_APPLICANTS_SUCCESS,
    GET_MY_APPLICATIONS_FAIL,
    GET_MY_APPLICATIONS_REQUEST,
    GET_MY_APPLICATIONS_SUCCESS,
    UPDATE_APPLICATION_STATUS_FAIL,
    UPDATE_APPLICATION_STATUS_REQUEST,
    UPDATE_APPLICATION_STATUS_SUCCESS,
} from "../constants/application.constants";
import { applicationBaseURL, config, jobBaseURL } from "@/utils";

export const loadUserApplications = () => async (dispatch) => {
    try {
        dispatch({ type: GET_MY_APPLICATIONS_REQUEST });

        const { data } = await axios.get(`${applicationBaseURL}/my`, config);

        dispatch({ type: GET_MY_APPLICATIONS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_MY_APPLICATIONS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const loadJobApplicants = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_JOB_APPLICANTS_REQUEST });
        const { data } = await axios.get(
            `${jobBaseURL}/applications/${id}`,
            config
        );
        dispatch({ type: GET_JOB_APPLICANTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_JOB_APPLICANTS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// admin

export const updateApplicationStatus = (id, status) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_APPLICATION_STATUS_REQUEST });
        const { data } = await axios.put(
            `${applicationBaseURL}/status/${id}`,
            { status },
            config
        );
        dispatch({ type: UPDATE_APPLICATION_STATUS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_APPLICATION_STATUS_FAIL,
            payload: error.response.data.message,
        });
    }
};
