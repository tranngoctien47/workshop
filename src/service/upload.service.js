import Urls from "../consts/Urls";
import axiosClient from "./axios";
import queryString from 'query-string';

const UploadService = {
  UPLOAD_FILE: async (params, data) => {
    const formData = new FormData();
    const parseParams = queryString.stringify(params)
    formData.append('file', data);

    return await axiosClient({
    method: "POST",
      url: `${Urls.UPLOAD_FILE}?${parseParams}`,
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
      transformRequest: (data, error) => {
        return formData;
      },
    });
  },
}

export default UploadService;