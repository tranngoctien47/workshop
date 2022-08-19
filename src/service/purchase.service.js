import { TYPE_USER } from "../consts/Enum";
import Urls from "../consts/Urls";
import { removeKeyOjectValueEmpty } from "../utils/common";
import storage from "../utils/localStorage";
import axiosClient from "./axios";

const PurchaseService = {
    LIST_PURCHASE: async (params) => {
        delete params.recordTotal;
        delete params.pageTotal;
        const newPamrams = removeKeyOjectValueEmpty(params);
        return await axiosClient.get(Urls.PURCHASE_LIST, { params: newPamrams });
    },
    PURCHASE_DETAIL: async (orderCode) => {
        return await axiosClient.get(`${Urls.PURCHASE_DETAIL}/${orderCode}/detail`);
    },
};

export default PurchaseService
