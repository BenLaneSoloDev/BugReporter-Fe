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
  
  const wizard = false;

  return(
    <div>
      <CardContent className="p-2">
        <Collapsible className="rounded-3xl drop-shadow-subtle data-open:bg-gray-200">
          <CollapsibleTrigger render={<Button variant="ghost" className="w-full py-6 rounded-3xl uppercase bg-gray-100 aria-expanded:bg-gray-200 hover:bg-gray-200">
            <span>Project Name</span>
            <ChevronDownIcon className="group-data-panel-open/button:rotate-180  ml-auto" /></Button>} /> 
          <CollapsibleContent className="flex flex-col gap-2 justify-center border-2 border-cc-green-2 rounded-3xl p-2">
            {
              wizard ? (
                <div className="h-[200px]"></div>
              )
              :
              (
                <div>
                  <Button className={`aspect-square uppercase self-center my-2`}>Add Bug</Button>
                  <Bugs />
                  <Button className={`bg-cc-red hover:bg-cc-red/80 self-end`}>Delete</Button>
                </div>
              )
            }
          </CollapsibleContent>
        </Collapsible>
      </CardContent>      
    </div>
  )
}