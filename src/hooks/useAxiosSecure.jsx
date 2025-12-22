import axios from 'axios'
import React, { useEffect } from 'react'
import useAuth from './useAuth'
import { useNavigate } from 'react-router'

const axiosSecure = axios.create({
  baseURL: 'https://assetverse-server-tau.vercel.app'
})


const useAxiosSecure = () => {
  const { user, logOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Interceptor request
    const reqInterceptor = axiosSecure.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`

      return config
    })
    // Interceptor response
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const statusCode = error.response?.status;

        // 🔒 Token invalid / expired
        if (statusCode === 401) {
          logOut().then(() => navigate("/login"));
        }

      
        return Promise.reject(error);
      }
    );


    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    }
  }, [user, logOut, navigate])

  return axiosSecure;
}

export default useAxiosSecure; 