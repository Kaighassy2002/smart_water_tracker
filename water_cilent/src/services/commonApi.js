import axios from "axios";

export const commonAPI = async (httpRequest, url, reqBody = {}, reqHeader = {}) => {
  const token = localStorage.getItem("token");

  const reqConfig = {
    method: httpRequest,
    url,
    data: reqBody,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...reqHeader,
    },
  };

  try {
    const res = await axios(reqConfig);
    return res;
  } catch (err) {
    return err.response || { error: "Unknown error occurred" };
  }
};
