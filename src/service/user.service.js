import Urls from "../consts/Urls";
import { removeKeyOjectValueEmpty } from "../utils/common";
import axiosClient from "./axios";

const UserService = {
  LIST_USER_ADIM: async (params) => {
    const newPamrams = removeKeyOjectValueEmpty(params);
    return await axiosClient.get(Urls.LIST_USER_ADMIN, {params: newPamrams});
  },
  DETAIL_USER: async (userCode) => {
    return await axiosClient.get(`${Urls.DETAIL_USER}/${userCode}/profile`);
  },
}

export default UserService;