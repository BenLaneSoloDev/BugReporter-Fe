import { useMutation } from "@tanstack/react-query";
import { ProjectFormData } from "@/schema/project.schema";
import Cookies from "js-cookie";

const createProject = async (project: ProjectFormData) => {
  
  const token = Cookies.get("token");
  
  const response = await fetch(`${import.meta.env.VITE_API_URL}projects`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(project)
  });

  if(!response.ok) {
    throw new Error("Network response was not ok")
  }

  return await response.json();
}

export function useCreateProject() {
  return useMutation({
    mutationFn: createProject,
    onSuccess: (response) => {
      console.log("Project was successfully created", response)
    },
    onError: (error) => {
      console.log("Error creating project ->", error)
    }
  });
}
