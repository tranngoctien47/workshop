import Urls from "../consts/Urls";
import axiosClient from "./axios";

const FinanceService = {
  FINANCE_LIST_DEALER: async (params) => {
    return await axiosClient.get(Urls.FINANCE_LIST_DEALER, { params });
  },
  FINANCE_LIST: async (params) => {
    return await axiosClient.get(Urls.FINANCE_LIST, { params });
  },
};

export default FinanceService;
