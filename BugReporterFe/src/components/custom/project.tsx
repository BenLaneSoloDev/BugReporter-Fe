import { Button } from "../ui/button";
import { CardContent } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDownIcon } from "lucide-react"

import Bugs from "./bugs";

export default function Project() {
  return(
    <div>
      <CardContent className="p-2">
        <Collapsible className="rounded-3xl drop-shadow-subtle data-open:bg-gray-200">
          <CollapsibleTrigger render={<Button variant="ghost" className="w-full py-6 rounded-3xl uppercase bg-gray-100 aria-expanded:bg-gray-200 hover:bg-gray-200">
            <span>Project Name</span>
            <Button className={`aspect-square ml-auto`}>+</Button>
            <Button variant={"destructive"}>Delete</Button>
            <ChevronDownIcon className="group-data-panel-open/button:rotate-180" /></Button>} />
          <CollapsibleContent className="border-2 border-cc-green-2 rounded-3xl p-2">
            <Bugs />
          </CollapsibleContent>
        </Collapsible>
      </CardContent>      
    </div>
  )
}