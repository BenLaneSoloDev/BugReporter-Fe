import { Button } from "../ui/button";
import { CardContent } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDownIcon } from "lucide-react"

import BugWizard from "@/components/custom/bugWizard";
import Bugs from "./bugs";
import { ProjectImportData } from "@/schema/project.schema";
import { BugFormData } from "@/schema/bug.schema";
import { useCreateBug } from "@/hooks/useCreateBug.hook";
import { useState } from "react";

interface IProject {
  details: ProjectImportData,
  onDelete: () => void
}

export default function Project({ details, onDelete } : IProject) {
  
  const [inCreation, setInCreation] = useState<boolean>(false);
  const createBug = useCreateBug();

  const onCreate = async (bug: BugFormData) => {
      setInCreation(false);
      createBug.mutate({...bug, project: details["_id"]});
    }

  return(
    <div>
      <CardContent className="p-2">
        <Collapsible className="rounded-3xl drop-shadow-subtle data-open:bg-gray-200">
          <CollapsibleTrigger render={<Button variant="ghost" className="w-full py-6 rounded-3xl uppercase bg-gray-100 aria-expanded:bg-gray-200 hover:bg-gray-200">
            <span className="pr-2 data-open:border-r-2 border-cc-red/60">{details.title}</span>
            <ChevronDownIcon className="group-data-panel-open/button:rotate-180  ml-auto" /></Button>} /> 
          <CollapsibleContent className="justify-center border-2 border-cc-green-2 rounded-3xl p-2">
            <div className="flex flex-col gap-2">
              {
                inCreation ? (
                  <div className="self-center">
                    <BugWizard project={details} onCancel={() => setInCreation(false)} onSubmit={(bug) => onCreate(bug)}/>
                  </div>
                )
                :
                ( 
                  <>
                    <Button onClick={() => setInCreation(true)} className={`aspect-square uppercase self-center my-2`}>Add Bug</Button>
                    <Bugs projectId={details["_id"]}/>
                    <Button onClick={onDelete} className={`bg-cc-red hover:bg-cc-red/80 self-end`}>Delete Project</Button>
                  </>
                )
              }
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>      
    </div>
  )
}