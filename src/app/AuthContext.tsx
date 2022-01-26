import React, { createContext, useState } from "react";
import api from "../app/api";
import { loginUser } from "./authAPI";
import { AxiosResponse } from "axios";
import axiosRetry from "axios-retry";

interface AuthContextInterface {
  isAuthenticated: boolean;
}

const loginUsername =
  process.env.REACT_APP_PRIMER_USERNAME || "primer.candidate@primer.test";
const loginPassword = process.env.REACT_APP_PRIMER_PASSWORD || "Candidate1234";

const AuthContext = createContext<AuthContextInterface | null>(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async () => {
    const bodyFormData = new FormData();
    bodyFormData.append("username", loginUsername);
    bodyFormData.append("password", loginPassword);
    const response: AxiosResponse = await loginUser(bodyFormData);
    localStorage.setItem("token", response?.data?.accessToken);
    setIsAuthenticated(true);
  };

  axiosRetry(api, {
    retryDelay: (retryCount) => {
      login();
      return retryCount * 5000;
    },
    retryCondition: (error) => {
      return error.response.status === 401;
    },
    retries: 2,
  });

  return (
    <Provider
      value={{
        isAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
