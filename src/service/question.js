import axios from "./axios";
export const getListQuestion = async () => {
  try {
    const { errCode, errDetail, result } = await axios({
      method: "GET",
      url: "diem-danh/get-questions",
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
export const setQuestion = async (body) => {
  try {
    const { errCode, errDetail, result } = await axios({
      method: "POST",
      url: "diem-danh/add-question",
      data: body,
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
