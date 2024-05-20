import axios from "axios";
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
    SIGN_UP_FAIL,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    UPDATE_JOB_FAIL,
    UPDATE_JOB_REQUEST,
    UPDATE_JOB_SUCCESS,
} from "../constants/company.constants";
import { comapnyBaseURL, config } from "@/utils";

export const registerCompany = (formData) => async (dispatch) => {
    try {
        dispatch({ type: SIGN_UP_REQUEST });
        const { data } = await axios.post(
            `${comapnyBaseURL}/register`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            }
        );
        dispatch({
            type: SIGN_UP_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log(error.response);
        dispatch({
            type: SIGN_UP_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const loginCompany = (formData) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const { data } = await axios.post(
            `${comapnyBaseURL}/login`,
            formData,
            config
        );
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const loadCompany = (formData) => async (dispatch) => {
    try {
        dispatch({ type: LOAD_COMPANY_REQUEST });
        const { data } = await axios.post(
            `${comapnyBaseURL}/load`,
            formData,
            config
        );

        dispatch({
            type: LOAD_COMPANY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log(error.response.data.originalError);
        dispatch({
            type: LOAD_COMPANY_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const createJob = (formData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_JOB_REQUEST });
        const { data } = await axios.post(
            `${comapnyBaseURL}/job/create`,
            formData,
            config
        );

        dispatch({
            type: CREATE_JOB_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log(error.response.data.originalError);
        dispatch({
            type: CREATE_JOB_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const loadJobs = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_JOBS_REQUEST });
        const { data } = await axios.get(`${comapnyBaseURL}/jobs`, config);

        dispatch({
            type: LOAD_JOBS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: LOAD_JOBS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const loadSingleJob = (id) => async (dispatch) => {
    try {
        dispatch({ type: LOAD_SINGLE_JOB_REQUEST });
        const { data } = await axios.get(`${comapnyBaseURL}/job/${id}`, config);
        dispatch({ type: LOAD_SINGLE_JOB_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: LOAD_SINGLE_JOB_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const updateJob = (id, formData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_JOB_REQUEST });

        const { data } = await axios.put(
            `${comapnyBaseURL}/job/update/${id}`,
            formData,
            config
        );

        dispatch({ type: UPDATE_JOB_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_JOB_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: COMPANY_LOGOUT_REQUEST });

        const { data } = await axios.get(`${comapnyBaseURL}/logout`, config);

        dispatch({ type: COMPANY_LOGOUT_SUCCESS, payload: data });
    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type: COMPANY_LOGOUT_FAIL,
            payload: error.response.data.message,
        });
    }
};
