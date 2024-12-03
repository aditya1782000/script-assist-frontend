import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import config from "../../config/config";
import { getToken, removeToken } from "../../utils/helpers/cookies.helpers";

type ApiError = {
  status?: number;
  message?: string;
};

const apiClient = async (options: AxiosRequestConfig): Promise<any> => {
  const baseURL = config.apiUrl;

  const clinet = axios.create({ baseURL });

  const token = getToken();

  if (token) clinet.defaults.headers.common.Authorization = `Bearer ${token}`;

  try {
    const response: AxiosResponse<any> = await clinet(options);

    if (!response.data) throw new Error("API Request Was Not Successful");

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      removeToken();
      window.location.href = "/login";
    }

    if (axios.isAxiosError(error) && error.response?.status === 403) {
      removeToken();
      window.location.href = "/login";
    }

    if (error?.message === "Network Error") {
      removeToken();
      window.location.href = "/500";
    }

    const errorObj: ApiError = {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    };

    throw errorObj;
  }
};

export default apiClient;
