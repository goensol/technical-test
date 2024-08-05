import axios from "axios";
import { HttpGetConfig } from "./type";

export const httpClient = (baseUrl: string) => {
  const instance = axios.create({
    baseURL: baseUrl,
  });

  const httpGet = async <TResponse, TParams>(
    endpoint: string,
    config: HttpGetConfig<TParams>
  ) => {
    const response = await instance.get<TResponse>(endpoint, config);
    return response.data;
  };

  return { httpGet };
};
