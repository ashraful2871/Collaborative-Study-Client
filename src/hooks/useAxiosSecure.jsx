import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        console.log("error caught in our very won interceptor", err);
        if (err.response.status === 401 || err.response.status === 403) {
          //make user logout
          signOutUser()
            .then(() => {
              console.log("logged out user");
              navigate("/login");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    );
  }, [signOutUser, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;
