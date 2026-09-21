import { useMutation } from "@tanstack/react-query";

import { SignupFormData } from "@/schema/signup.schema";

const createUser = async (user: SignupFormData) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}auth/signup`, {
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

export function useSignup() {
  return useMutation({
    mutationFn: createUser,
    onSuccess: (response) => {
      console.log("User was successfully created", response)
    },
    onError: (error) => {
      console.log("Error creating user ->", error)
    }
  });
}
