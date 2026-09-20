import { useMutation } from "@tanstack/react-query";
import { MongoId } from "@/schema/project.schema";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";

const deleteBug = async (id: MongoId) => {
  
  const token = Cookies.get("token");
  
  const response = await fetch(`${import.meta.env.BACKEND_URL}bugs/${id}`, {
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

export function useDeleteBug() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBug,
    onSuccess: (response) => {
      console.log("Bug was successfully deleted", response);
      queryClient.invalidateQueries({ queryKey: ["fetchBugs"] });
    },
    onError: (error) => {
      console.log("Error deleting bug ->", error)
    }
  });
}