// React Hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Private Axios Request Maker
import { axiosPrivate } from '../api/axios';

// Custom Hooks
import useRefreshToken from './useRefreshToken';

// Store Actions
import { authActions } from "../store/index";


const useAxiosPrivate = () => {
    const dispatch = useDispatch();

    const refresh = useRefreshToken();

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const loggedInUser = useSelector((state) => state.auth.loggedInUser);


    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${ loggedInUser.accessToken }`
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error.config;
                if (error.response.status == 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    dispatch(authActions.changeLoggedInUserAccessToken(newAccessToken));
                    prevRequest.headers['Authorization'] = `Bearer ${ newAccessToken }`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [ isLoggedIn, refresh ])


    return axiosPrivate;
};


export default useAxiosPrivate;