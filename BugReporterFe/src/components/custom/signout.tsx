import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie";

export default function Signout() {
  
  const navigate = useNavigate();

  function signOut(): void {
    Cookies.remove("token")
    navigate("/login");
  }

  return (
    <div>
      <Button onClick={signOut} variant="destructive">Sign Out</Button>
    </div>
  )
}