import { useState } from "react";
import api from "../api/index";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(null);
  const [serverError, setServerError] = useState(null);

  const register = async (username, email, password) => {
    setIsLoading(true);
    setServerError(null);

    const newUser = {
      username,
      email,
      password,
    };
    try {
      const response = await api.post("/user/register", newUser);
      if (response.status === 201) {
        // update loading state
        setIsLoading(false);
        navigate("/reg-success");
      }
    } catch (error) {
      if (error.response) {
        setServerError(error.response.data.message);
        setIsLoading(false);
      }
    }
  };

  return { register, isLoading, serverError };
};
