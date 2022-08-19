import Urls from "../consts/Urls";
import axiosClient from "./axios";

const AuthService = {
  SIGN_UP: async (params) => {
    return await axiosClient.post(Urls.SIGN_UP, params);
  },
  SIGN_IN: async (params) => {
    return await axiosClient.post(Urls.SIGN_IN, params);
  },
};

export default AuthService;