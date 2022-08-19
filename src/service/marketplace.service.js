import Urls from "../consts/Urls";
import { removeKeyOjectValueEmpty } from "../utils/common";
import axiosClient from "./axios";

const MarketplaceService = {
  LIST_MARKETPLACE: async (params) => {
    delete params.recordTotal;
    delete params.pageTotal;
    const newPamrams = removeKeyOjectValueEmpty(params);
    return await axiosClient.get(Urls.MARKETPLACE_LIST, { params: newPamrams });
  },
  CREATE_MARKETPLACE_ORDER: async (params) => {
    // delete params.photos;
    return await axiosClient.post(`${Urls.CREATE_ORDER_MARKETPLACE}`, params);
  }
};

export default MarketplaceService;
