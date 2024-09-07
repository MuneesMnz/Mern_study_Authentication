import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { LOGIN } from "../context/AuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const res = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password }),
    });

    const json =await res.json();

    if (!res.ok) {
      setError(json.error);
      setIsLoading(false);
    }

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      setError(null);
      dispatch({ type: LOGIN, payload: json });
      setIsLoading(false);
    }
  };

  return { login, error, isLoading };
};
