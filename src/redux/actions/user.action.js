import axios from "axios";
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
    UPDATE_PROFILE_SUCCESS,
    UPLOAD_RESUME_FAIL,
    UPLOAD_RESUME_REQUEST,
    UPLOAD_RESUME_SUCCESS,
    VERIFY_ACCOUNT_FAIL,
    VERIFY_ACCOUNT_REQUEST,
    VERIFY_ACCOUNT_SUCCESS,
} from "../constants/user.constants";
import { baseUrl, config } from "@/utils";

export const signUp = (formData) => async (dispatch) => {
    try {
        dispatch({ type: SIGN_UP_REQUEST });
        const { data } = await axios.post(
            `${baseUrl}/register`,
            formData,
            config
        );
        dispatch({ type: SIGN_UP_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SIGN_UP_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const signIn = (formData) => async (dispatch) => {
    try {
        dispatch({ type: SIGN_IN_USER_REQUEST });

        const { data } = await axios.post(`${baseUrl}/login`, formData, config);

        dispatch({ type: SIGN_IN_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SIGN_IN_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const verifyAccount = (formData) => async (dispatch) => {
    try {
        dispatch({ type: VERIFY_ACCOUNT_REQUEST });
        const { data } = await axios.post(
            `${baseUrl}/verify-account`,
            formData,
            config
        );
        dispatch({ type: VERIFY_ACCOUNT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: VERIFY_ACCOUNT_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const resendCode = (email) => async (dispatch) => {
    try {
        dispatch({ type: RESEND_VERIFICATION_CODE_REQUEST });
        const { data } = await axios.post(
            `${baseUrl}/resend-code`,
            { email },
            config
        );
        dispatch({ type: RESEND_VERIFICATION_CODE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: RESEND_VERIFICATION_CODE_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        const { data } = await axios.get(`${baseUrl}/me`, config);
        dispatch({ type: LOAD_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const updateProfile = (formData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        const { data } = await axios.post(
            `${baseUrl}/profile-update`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            }
        );
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const updateEmail = (formData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_EMAIL_REQUEST });
        const { data } = await axios.post(
            `${baseUrl}/update-email`,
            formData,
            config
        );
        dispatch({ type: UPDATE_EMAIL_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_EMAIL_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const updatePreference = (formData) => async (dispatch) => {
    try {
        dispatch({ type: EDIT_PREFERENCE_REQUEST });
        const { data } = await axios.post(
            `${baseUrl}/my/preferences`,
            formData,
            config
        );
        dispatch({ type: EDIT_PREFERENCE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: EDIT_PREFERENCE_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const uploadResume = (formData) => async (dispatch) => {
    try {
        dispatch({ type: UPLOAD_RESUME_REQUEST });
        const { data } = await axios.post(
            `${baseUrl}/upload/resume`,
            { file: formData },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            }
        );
        dispatch({ type: UPLOAD_RESUME_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPLOAD_RESUME_FAIL,
            payload: error.response.data.message,
        });
    }
};
