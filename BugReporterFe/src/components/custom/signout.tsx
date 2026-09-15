import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"

export default function Signout() {
  
  const navigate = useNavigate();

  return (
    <div>
      <Button variant="destructive">Sign Out</Button>
    </div>
  )
}