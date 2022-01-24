import React, { createContext, useState } from "react";
import api from "../app/api";
import { loginUser } from "./authAPI";
import { AxiosError, AxiosResponse } from "axios";

type AuthResponse = {
  accessToken: string;
  tokenType: string;
  scope: string;
  scopes: string[];
  primerAccounts: any[];
  sessionPrimerAccountId: string;
};

interface AuthContextInterface {
  isAuthenticated: boolean;
}

type StatusResponse = {
  status: number;
};

interface AuthErrorResponse {
  response: StatusResponse;
}

const loginUsername =
  process.env.REACT_APP__PRIMER_USERNAME || "primer.candidate@primer.test";
const loginPassword = process.env.REACT_APP__PRIMER_PASSWORD || "Candidate1234";

const AuthContextold = createContext<AuthContextInterface | null>(null);
const { Provider } = AuthContextold;

const AuthProvider = ({ children }) => {
  const userToken = localStorage.getItem("token") || null;

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  api.interceptors.response.use(undefined, (error: AuthErrorResponse) => {
    if (error.response.status === 401) {
      void reLogin();
    }
    return Promise.reject(error);
  });

  const reLogin = async () => {
    const bodyFormData = new FormData();
    bodyFormData.append("username", loginUsername);
    bodyFormData.append("password", loginPassword);
    const response: AxiosResponse = await loginUser(bodyFormData);
    console.log(response);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
    localStorage.setItem("token", response?.data?.accessToken);
    // const responseJson = await response.json()
    setIsAuthenticated(true);
  };

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

export { AuthContextold, AuthProvider };
