import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Badge } from "../ui/badge"

export default function Bug() {
  return (
    <div className="mx-auto w-full border-cc-green-2 border rounded-2xl">
      <CardContent className="p-2">
        <Collapsible className="rounded-md data-open:bg-muted">
          <CollapsibleTrigger render={<Button variant="ghost" className="w-full uppercase">Bug Name
            <Badge className="ml-auto capitalize">Low</Badge>
            <ChevronDownIcon className="group-data-panel-open/button:rotate-180" /></Button>} />
          <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm font-light">
            <div className="flex flex-row gap-2">
              <Badge variant="outline">Category</Badge>|<Badge>Environment 1</Badge><Badge>Environment 2</Badge>
            </div>
            <div className="flex flex-col items-start gap-1">
              <h3 className="font-normal">Expected Behaviour</h3>
              <div className="border border-cc-green-2 rounded-xl px-2 py-0.5 mx-2">text</div>
            </div>
            <div className="flex flex-col items-start gap-1">
              <h3 className="font-normal">Actual Behaviour</h3>
              <div className="border border-cc-green-2 rounded-xl px-2 py-0.5 mx-2">text</div>
            </div>
            <div className="flex flex-col items-start gap-1">
              <h3 className="font-normal">Steps to Reproduce</h3>
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