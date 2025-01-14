import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

const useAxiosSecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  axiosSecure.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response.status === 401 || err.response.status === 403) {
        signOutUser().then(() => navigate("/login"));
      }
      return Promise.reject(err);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
