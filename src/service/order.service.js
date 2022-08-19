import { TYPE_USER } from "../consts/Enum";
import Urls from "../consts/Urls";
import { removeKeyOjectValueEmpty, urlListOrder } from "../utils/common";
import storage from "../utils/localStorage";
import axiosClient from "./axios";

const OrderService = {
    LIST_ORDER: async (params) => {
        delete params.recordTotal;
        delete params.pageTotal;
        const newPamrams = removeKeyOjectValueEmpty(params);
        return await axiosClient.get(urlListOrder(storage.getIdToken()), { params: newPamrams });
    },
    ORDER_DETAIL: async (orderCode) => {
        return await axiosClient.get(`${Urls.ORDER_DETAIL}/${orderCode}/detail`);
    },
    ORDER_DETAIL_ADMIN: async (orderCode, type) => {
        return await axiosClient.get(`${Urls.ORDER_DETAIL_ADMIN}/${orderCode}/detail?type=${type}`);
    },
    UPDATE_STATUS_ORDER_ADMIN: async (orderCode, typeOrder, params) => {
        return await axiosClient.post(`${Urls.UPDATE_STATUS_ORDER_ADMIN}/${orderCode}/update?type=${typeOrder}`, params);
    },
    PRE_ORDER_INFO: async (orderCode) => {
        return await axiosClient.get(`${Urls.PRE_ORDER_INFO}/${orderCode}/pre-order-info`);
    },
};

export default OrderService
