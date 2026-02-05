import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useFetch(queryKey, endPoint, dataProfile) {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: getSinglePost,
    select: (data) => data.data,
    enabled: !!dataProfile,
  });
  async function getSinglePost() {
    return axios.get(`${import.meta.env.VITE_BASE_URL}/${endPoint}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }
  return { data, isError, error, isLoading };
}
