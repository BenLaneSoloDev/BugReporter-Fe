import { useMutation } from "@tanstack/react-query";
import { BugPostData } from "@/schema/bug.schema";
import Cookies from "js-cookie";

const createBug = async (bug: BugPostData) => {
  
  const token = Cookies.get("token");
  const { project, ...bugBody} = bug;

  const response = await fetch(`${import.meta.env.VITE_API_URL}projects/${project}/bugs`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(bugBody)
  });

  console.log(JSON.stringify(bugBody));
  console.log(response);

  if(!response.ok) {
    throw new Error("Network response was not ok")
  }

  return await response.json();
}

export function useCreateBug() {
  return useMutation({
    mutationFn: createBug,
    onSuccess: (response) => {
      console.log("Bug was successfully created", response)
    },
    onError: (error) => {
      console.log("Error creating bug ->", error)
    }
  });
}
