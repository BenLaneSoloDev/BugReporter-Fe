import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

const logoutUser = async () => {
  
  const token = Cookies.get("token");

  const response = await fetch(`${import.meta.env.VITE_API_URL}auth/logout`, {
    method: "POST",
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

export function useLogout() {
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: (response) => {
      console.log("User sign out successful", response);
      Cookies.remove("token");
    },
    onError: (error) => {
      console.log("Error signing out ->", error)
    }
  });
}