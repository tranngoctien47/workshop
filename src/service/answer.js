import axios from "./axios";
export const getListAnswer = async (params) => {
  try {
    const { errCode, errDetail, result } = await axios({
      method: "GET",
      url: "diem-danh/get-answers",
      params,
    });
    return {
      errCode: errCode,
      errDetail: errDetail,
      result: result,
    };
  } catch (error) {
    return {
      result: null,
      errCode: 1,
      errDetail: "system error",
    };
  }
};
export const getStatisticAnswer = async (params) => {
  try {
    const { errCode, errDetail, result } = await axios({
      method: "GET",
      url: "diem-danh/stats-answers",
      params,
    });
    return {
      errCode: errCode,
      errDetail: errDetail,
      result: result,
    };
  } catch (error) {
    return {
      result: null,
      errCode: 1,
      errDetail: "system error",
    };
  }
};
