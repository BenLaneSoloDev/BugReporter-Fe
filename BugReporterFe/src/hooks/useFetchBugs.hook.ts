import { QueryFunction, keepPreviousData, QueryFunctionContext, useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie";
import { useEffect } from "react";

interface IFetchBugsParams {
  projectId: string,
  limit?: string,
  page?: string
}

type BugsQueryKey = ["fetchBugs", IFetchBugsParams];

const fetchBugs = async ({ queryKey }: QueryFunctionContext<BugsQueryKey>) => {
  const [_key, { limit = "5", page = "1", projectId }] = queryKey;
  const token = Cookies.get("token");

  const url = new URL(`${import.meta.env.VITE_API_URL}projects/${projectId}/bugs`);
  url.searchParams.append("limit", limit);
  url.searchParams.append("page", page);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
}

export function useFetchBugs(params: IFetchBugsParams) {
  const query = useQuery({
    queryKey: ["fetchBugs", params],
    queryFn: fetchBugs,
    placeholderData: keepPreviousData
  })

  useEffect(() => {
    if (query.data) {
      console.log("Bugs fetched successfully", query.data);
    }
  }, [query.data]);

  useEffect(() => {
    if (query.error) {
      console.log("Error fetching bugs ->", query.error);
    }
  }, [query.error]);

  return query;
};
