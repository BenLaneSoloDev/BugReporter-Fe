import { Badge } from "../ui/badge";

interface StatusProps {
  status?: "low" | "normal" | "high" | "extreme";
}

export default function Status({ status = "low" } : StatusProps) {
  
  const statusStyles = {
    low: "bg-green-500",
    normal: "bg-yellow-400 text-gray-700",
    high: "bg-orange-500",
    extreme: "bg-red-600",
  }
  
  return (
    <Badge className={`${statusStyles[status]}`}>{status}</Badge>
  )
}