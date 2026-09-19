import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Badge } from "../ui/badge"
import ConfirmButton from "./confirmButton.tsx"

import Status from "./status.tsx"
import { BugGetData } from "@/schema/bug.schema.ts"
import { useState } from "react"

interface IBug {
  details: BugGetData,
  onDelete: () => void
}

export default function Bug({ details, onDelete } : IBug) {
  
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  return (
    <div className="mx-auto w-full border-cc-green-2 border rounded-2xl">
      <CardContent>
        <Collapsible className="rounded-2xl data-open:bg-muted" open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger render={<Button variant="ghost" className="w-full h-full rounded-2xl uppercase px-3 py-1 hover:bg-muted">
            <div className="flex flex-row w-full min-w-0">
              <p className={`text-left mr-2 ${!isOpen ? "truncate" : "text-wrap text-left"}`}>{details.title}</p>
              <div className="ml-auto shrink-0">{ !isOpen && <Status status={details.severity} />}</div>
              <ChevronDownIcon className="group-data-panel-open/button:rotate-180 shrink-0 ml-1" />
            </div>
            </Button>} />
          <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm font-light">
            <div className="uppercase mb-2">{ isOpen &&<Status status={details.severity} />}</div>
            <div className="flex flex-row flex-wrap gap-2">
              <Badge variant="outline">{details.developmentArea}</Badge>
              | 
              { details.environmentsUsed.map((value, index) => (
                <Badge key={`badge${index}`}>{value}</Badge>
              ))}
            </div>
            <div className="flex flex-col items-start gap-1">
              <h4 className="font-normal">Expected Behaviour</h4>
              <div className="border-2 rounded-xl px-2 py-0.5 mx-2">{details.expectedResult}</div>
            </div>
            <div className="flex flex-col items-start gap-1">
              <h4 className="font-normal">Actual Behaviour</h4>
              <div className="border-2 rounded-xl px-2 py-0.5 mx-2">{details.actualResult}</div>
            </div>
            <div className="flex flex-col items-start gap-1">
              <h4 className="font-normal">Steps to Reproduce</h4>
              <ol className="list-decimal list-inside border-2 rounded-xl px-2 py-0.5 mx-2">
                { details.stepsToReproduce.map((value, index) => (
                  <li key={`bug${index}`}>{value}</li>
                ))}                
              </ol>
            </div>
            <div className="self-end"><ConfirmButton type="bug" size="xs" onConfirm={onDelete}/></div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </div>
  )
}

export function BugsSkeleton() {
  return (
    <div className="flex flex-col justify-center items-center gap-3 animate-pulse">
      <div className="h-7 w-[20%] bg-muted rounded-2xl" />
      <div className="h-7 w-full bg-muted rounded-2xl" />
      <div className="h-7 w-full bg-muted rounded-2xl" />
      <div className="h-7 w-full bg-muted rounded-2xl" />
      <div className="h-7 w-full bg-muted rounded-2xl" />
      <div className="h-7 w-full bg-muted rounded-2xl" />
    </div>
  )
}