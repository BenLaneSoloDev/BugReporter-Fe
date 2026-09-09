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

export default function Bug() {
  return (
    <div className="mx-auto w-full border-cc-green-2 border rounded-2xl">
      <CardContent>
        <Collapsible className="rounded-2xl data-open:bg-muted">
          <CollapsibleTrigger render={<Button variant="ghost" className="w-full rounded-2xl uppercase p-4">Bug Name
            <div className="ml-auto"><Status /></div>
            <ChevronDownIcon className="group-data-panel-open/button:rotate-180" /></Button>} />
          <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm font-light">
            <div className="flex flex-row gap-2">
              <Badge variant="outline">Category</Badge>|<Badge>Environment 1</Badge><Badge>Environment 2</Badge>
            </div>
            <div className="flex flex-col items-start gap-1">
              <h4 className="font-normal">Expected Behaviour</h4>
              <div className="border border-cc-green-2 rounded-xl px-2 py-0.5 mx-2">text</div>
            </div>
            <div className="flex flex-col items-start gap-1">
              <h4 className="font-normal">Actual Behaviour</h4>
              <div className="border border-cc-green-2 rounded-xl px-2 py-0.5 mx-2">text</div>
            </div>
            <div className="flex flex-col items-start gap-1">
              <h4 className="font-normal">Steps to Reproduce</h4>
              <ol className="list-decimal list-inside border border-cc-green-2 rounded-xl px-2 py-0.5 mx-2">
                <li>x</li>
                <li>y</li>
                <li>z</li>
              </ol>
            </div>
            <Button size="xs" className={`bg-cc-red hover:bg-cc-red/80 ml-auto`}>Delete</Button>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </div>
  )
}