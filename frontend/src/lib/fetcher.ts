import { Fetch, FetchResponse } from "@/types";
import { api } from "@/utils/axios";
import { AxiosRequestConfig } from "axios";

const fetchData = async <T>({
  endpoint,
  accessToken,
  feature,
  method,
  payload,
}: Fetch): Promise<FetchResponse<T>> => {
  const url = `/api/${
    accessToken ? "private" : "public"
  }/${feature}/${endpoint}`;

  const axiosConfig: AxiosRequestConfig = {
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { ["authorization"]: `Bearer ${accessToken}` }),
    },
    data: payload,
  };

  const res = await api(axiosConfig);
  return res.data as FetchResponse<T>;
};

export default fetchData;
