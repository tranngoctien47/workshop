import Urls from "../consts/Urls";
import { removeKeyOjectValueEmpty } from "../utils/common";
import axiosClient from "./axios";

const InventoryService = {
    LIST_INVENTORY: async (params) => {
        delete params.recordTotal;
        delete params.pageTotal;
        const newPamrams = removeKeyOjectValueEmpty(params);
        return await axiosClient.get(Urls.INVENTORY_LIST, { params: newPamrams });
    },
    COUNT_STATUS_INVENTORY: async () => {
        return await axiosClient.get(Urls.INVENTORY_COUNT_STATUS);
    },
    DETAIL_INVENTORY: async (code) => {
        return await axiosClient.get(`${Urls.INVENTORY_DETAIL}/${code}`);
    },
    LIST_CATEGORY: async (params) => {
        return await axiosClient.get(`${Urls.INVENTORY_CATE}`, { params: params });
    },
    UPDATE_INVENTORY: async (code, params) => {
        return await axiosClient.patch(`${Urls.INVENTORY_UPDATE}/${code}`, params);
    },
    DELETE_INVENTORY: async (code) => {
        return await axiosClient.delete(`${Urls.INVENTORY_DELETE}/${code}`);
    },
    LIST_LOCATION: async () => {
        return await axiosClient.get(`${Urls.LIST_LOCATION}`);
    },
    LIST_BRAND : async () => {
        return await axiosClient.get(`${Urls.LIST_BRAND}`);
    },
    LIST_MODEL: async (params) => {
        return await axiosClient.get(`${Urls.LIST_MODEL}`, {params});
    },
    CREATE_INVENTORY: async (params) => {
        return await axiosClient.post(`${Urls.INVENTORY_CREATE}`, params);
    },
    UPDATE_INVENTORY: async (params, code) => {
        return await axiosClient.patch(`${Urls.INVENTORY_UPDATE}/${code}`, params);
    },
};

export default InventoryService;
