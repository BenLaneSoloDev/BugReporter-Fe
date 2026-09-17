import { Button } from "../ui/button";
import { CardContent } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDownIcon } from "lucide-react"
import ConfirmButton from "./confirmButton";
import CreateEmpty from "./createEmpty";

import BugWizard from "@/components/custom/bugWizard";
import Bugs from "./bugs";
import { ProjectImportData } from "@/schema/project.schema";
import { BugFormData } from "@/schema/bug.schema";
import { useCreateBug } from "@/hooks/useCreateBug.hook";
import { useState } from "react";

interface IProject {
  details: ProjectImportData,
  onDelete: () => void
  onBugCreate: () => void
}

export default function Project({ details, onDelete, onBugCreate } : IProject) {
  
  const [inCreation, setInCreation] = useState<boolean>(false);
  const [hasBugs, setHasBugs] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const createBug = useCreateBug();

  const onCreate = async (bug: BugFormData) => {
      onBugCreate();  
      setInCreation(false);
      createBug.mutate({...bug, project: details["_id"]});
    }

  return(
    <div>
      <CardContent className={`p-2`}>
        <Collapsible className={`rounded-3xl drop-shadow-subtle data-open:bg-gray-200 ${isOpen && "border-2 border-cc-green-2"}`} open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger render={<Button variant="ghost" className={`flex flex-col w-full h-auto py-3 aria rounded-3xl uppercase bg-gray-100 aria-expanded:bg-gray-200 hover:bg-gray-200`}>
            <div className="flex flex-row w-full">
              <span className="data-open:border-r-2 border-cc-red/60">{details.title}</span>
              { (!isOpen && details.description) && (
                <div className="flex flex-row w-full mr-[40%] text-gray-600">
                  <div className="mx-2">|</div>
                  <span className="line-clamp-1 truncate normal-case first-letter:capitalize">{details.description}</span>
                </div>
              )}
              <ChevronDownIcon className="group-data-panel-open/button:rotate-180 ml-auto" />
            </div>
            { (isOpen && details.description) && (
              <div className={`flex flex-row w-full`}>
                <span className="normal-case font-normal first-letter:capitalize">{details.description}</span>
              </div>
            )}
            </Button>} /> 
          <CollapsibleContent className="justify-center rounded-3xl">
            <div className={`flex flex-col gap-2 p-2 ${isOpen && "border-t-2 border-cc-green-2"}`}>
              {
                inCreation ? (
                  <div className="self-center py-4">
                    <BugWizard project={details} onCancel={() => setInCreation(false)} onSubmit={(bug) => onCreate(bug)}/>
                  </div>
                )
                :
                (
                  <>
                    { hasBugs && <Button onClick={() => setInCreation(true)} className={`aspect-square uppercase self-center my-2`}>Add Bug</Button>}
                    { !hasBugs && <CreateEmpty type="bug" onCreate={() => setInCreation(true)}/> }
                    <Bugs projectId={details["_id"]} onUpdate={(status: boolean) => setHasBugs(status)} reload={!inCreation}/>
                    { hasBugs && <div className="self-end"><ConfirmButton type="project" onConfirm={onDelete}/></div> }
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

export function ProjectSkeleton() {
  return (
    <div>
      <CardContent className={`p-2`}>
        <Collapsible className={`rounded-3xl drop-shadow-subtle data-open:bg-gray-200 `}>
          <CollapsibleTrigger render={<Button variant="ghost" className={`flex flex-col w-full h-auto py-3 aria rounded-3xl uppercase bg-gray-100 aria-expanded:bg-gray-200 hover:bg-gray-200`}>
            
          </Button>} /> 
        </Collapsible>
      </CardContent>
    </div>
  )
}

export function ProjectsSkeleton() {
  return (
    <div>
      
    </div>
  )
}