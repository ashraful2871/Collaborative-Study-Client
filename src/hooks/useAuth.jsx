import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default useAuth;
