import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import api from "../api/index";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(null);
  const [serverError, setServerError] = useState(null);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setServerError(null);

    const user = {
      email,
      password,
    };

    try {
      const response = await api.post("/user/login", user);
      if (response.status === 201) {
        localStorage.setItem("user", JSON.stringify(response.data));

        dispatch({ type: "LOGIN", payload: response });

        setIsLoading(false);

        navigate("/logged-in");
      }
    } catch (error) {
      setServerError(error.response.data.message);
      setIsLoading(false);
    }
  };

  return { login, isLoading, serverError };
};
