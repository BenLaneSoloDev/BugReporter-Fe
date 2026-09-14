import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Badge } from "../ui/badge"

import Status from "./status.tsx"
import { BugGetData } from "@/schema/bug.schema.ts"

interface IBug {
  details: BugGetData
}

export default function Bug({ details } : IBug) {
  return (
    <div className="mx-auto w-full border-cc-green-2 border rounded-2xl">
      <CardContent>
        <Collapsible className="rounded-2xl data-open:bg-muted">
          <CollapsibleTrigger render={<Button variant="ghost" className="w-full rounded-2xl uppercase p-4">
            {details.title}
            <div className="ml-auto"><Status /></div>
            <ChevronDownIcon className="group-data-panel-open/button:rotate-180" /></Button>} />
          <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm font-light">
            <div className="flex flex-row gap-2">
              <Badge variant="outline">{details.developmentArea}</Badge>
              |
              { details.environmentsUsed.map((value) => (
                <Badge>{value}</Badge>
              ))}
            </div>
            <div className="flex flex-col items-start gap-1">
              <h4 className="font-normal">Expected Behaviour</h4>
              <div className="border border-cc-green-2 rounded-xl px-2 py-0.5 mx-2">{details.expectedResult}</div>
            </div>
            <div className="flex flex-col items-start gap-1">
              <h4 className="font-normal">Actual Behaviour</h4>
              <div className="border border-cc-green-2 rounded-xl px-2 py-0.5 mx-2">{details.actualResult}</div>
            </div>
            <div className="flex flex-col items-start gap-1">
              <h4 className="font-normal">Steps to Reproduce</h4>
              <ol className="list-decimal list-inside border border-cc-green-2 rounded-xl px-2 py-0.5 mx-2">
                { details.stepsToReproduce.map((value) => (
                  <li>{value}</li>
                ))}                
              </ol>
            </div>
            <Button size="xs" className={`bg-cc-red hover:bg-cc-red/80 ml-auto`}>Delete Bug</Button>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </div>
  )
}