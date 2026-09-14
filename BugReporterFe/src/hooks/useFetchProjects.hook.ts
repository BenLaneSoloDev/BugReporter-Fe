import { QueryFunction, QueryFunctionContext, useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie";
import { useEffect } from "react";

interface IFetchProjectParams {
  limit?: string,
  page?: string
}

type ProjectsQueryKey = ["fetchProjects", IFetchProjectParams];

const fetchProjects = async ({ queryKey }: QueryFunctionContext<ProjectsQueryKey>) => {
  const [_key, { limit = "5", page = "1" }] = queryKey;
  const token = Cookies.get("token");

  const url = new URL(`${import.meta.env.VITE_API_URL}projects`);
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

export function useFetchProjects(params: IFetchProjectParams) {
  const query = useQuery({
    queryKey: ["fetchProjects", params],
    queryFn: fetchProjects
  })

  useEffect(() => {
    if (query.data) {
      console.log("Projects fetched successfully", query.data);
    }
  }, [query.data]);

  useEffect(() => {
    if (query.error) {
      console.log("Error fetching projects ->", query.error);
    }
  }, [query.error]);

  return query;
};
