import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import { useLogout } from "@/hooks/useLogout.hook";
import { useEffect } from "react";

export default function Signout() {
  
  const { mutate, isSuccess, isPending } = useLogout();
  const navigate = useNavigate();

  function signOut(): void {
    mutate();
  }

  useEffect(() => {
    if (isSuccess) navigate("/login");
  }, [isSuccess])

  return (
    <div>
      <Button onClick={signOut} variant="destructive">
        Sign Out
      </Button>
    </div>
  )
}