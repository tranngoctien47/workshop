import { CHAT_TYPE_CREATE } from "../consts/Enum";
import Urls from "../consts/Urls";
import axiosClient from "./axios";

const ChatService = {
  CHAT_LIST: async (params) => {
    return await axiosClient.get(`${Urls.CHAT_LIST}`, { params });
  },
  CHAT_DETAIL: async (chatCode) => {
    return await axiosClient.get(`${Urls.CHAT_DETAIL}/${chatCode}/msg`);
  },
  CHAT_CREATE: async (params, type, optionChat) => {
    switch (type) {
      case CHAT_TYPE_CREATE.ORDER: {
        return await axiosClient.post(
          `${Urls.CHAT_ORDER_CREATE}?chatWith=${optionChat}`,
          params
        );
      }
      default: {
        return await axiosClient.post(
          `${Urls.CHAT_CREATE}?chatWith=${optionChat}`,
          params
        );
      }
    }
  },
  SEND_MESSAGE: async (chatCode, params) => {
    return await axiosClient.post(
      `${Urls.SEND_MESSAGE}/${chatCode}/msg`,
      params
    );
  }
};

export default ChatService;
