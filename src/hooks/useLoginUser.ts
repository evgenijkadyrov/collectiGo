import { useNavigate } from "react-router-dom";
import { Paths } from "@/Paths";
import { useState } from "react";
import { login } from "@/api/auth";

export interface LoginResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export const useLoginUser = () => {
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const loginUser = async (data: any) => {
    try {
      const res: LoginResponse = await login(data);
      localStorage.setItem("token", res.token);
      localStorage.setItem("name", res.user.name);
      localStorage.setItem("email", res.user.email);
      navigate(Paths.home);
    } catch (error:any) {
      setError(error.message);
    }
  };

  return { loginUser, error };
};