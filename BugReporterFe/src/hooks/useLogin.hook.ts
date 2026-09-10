import { useMutation } from "@tanstack/react-query";
import { LoginFormData } from "@/schema/login.schema.ts";
import Cookies from "js-cookie";

const loginUser = async (user: LoginFormData) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}auth/login`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json" 
    },
    body: JSON.stringify(user)
  });

  if(!response.ok) {
    throw new Error("Network response was not ok")
  }

  return await response.json();
}

export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      console.log("User login successful", response)
      Cookies.set("token", response.data.accessToken, { expires: 1 });
    },
    onError: (error) => {
      console.log("Error authenticating ->", error)
    }
  });
}
