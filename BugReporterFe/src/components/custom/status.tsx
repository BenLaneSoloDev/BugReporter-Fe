import { Badge } from "../ui/badge";

interface StatusProps {
  status?: "low" | "medium" | "high" | "critical";
}

export default function Status({ status = "low" } : StatusProps) {
  
  const statusStyles = {
    low: "bg-green-500",
    medium: "bg-yellow-400 text-gray-700",
    high: "bg-orange-500",
    critical: "bg-red-600",
  }
  
  return (
    <Badge className={`${statusStyles[status]}`}>{status}</Badge>
  )
}