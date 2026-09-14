import { useMutation } from "@tanstack/react-query";
import { MongoId } from "@/schema/project.schema";
import Cookies from "js-cookie";

const deleteProject = async (id: MongoId) => {
  
  const token = Cookies.get("token");
  
  const response = await fetch(`${import.meta.env.VITE_API_URL}projects/${id}`, {
    method: "DELETE",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if(!response.ok) {
    throw new Error("Network response was not ok")
  }

  return await response.json();
}

export function useDeleteProject() {
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: (response) => {
      console.log("Project was successfully deleted", response)
    },
    onError: (error) => {
      console.log("Error deleting project ->", error)
    }
  });
}