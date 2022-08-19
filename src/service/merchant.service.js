import Urls from "../consts/Urls";
import axiosClient from "./axios";

const MerchantService = {
  CREATE_MERCHANT: async (params) => {
    return await axiosClient.post(Urls.CREATE_MERCHANT, params);
  },
  LIST_MERCHANT: async (params) => {
    return await axiosClient.get(Urls.LIST_MERCHANT, {params});
  },
  DETAIL_MERCHANT: async (merchantCode) => {
    return await axiosClient.get(`${Urls.DETAIL_MERCHANT}/${merchantCode}`);
  },
  UPDATE_STATUS_MERCHANT: async (params, merchantCode) => {
    return await axiosClient.post(`${Urls.CHANGE_STATUS_MERCHANT}/${merchantCode}`, params);
  },
}

export default MerchantService;