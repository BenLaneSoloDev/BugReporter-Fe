import { Badge } from "@/components/ui/badge";

export default function Tag() {
  return (
    <Badge className="flex flex-row gap-1">
      <p>Tag</p>
      <button className={"bg-cc-red/75 hover:bg-cc-red transition-colors h-3 w-auto aspect-square rounded-full"}>X</button>
    </Badge>
  )
}