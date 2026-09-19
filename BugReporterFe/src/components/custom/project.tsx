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
import { useCallback, useState } from "react";

interface IProject {
  details: ProjectImportData,
  onDelete: () => void
  onBugCreate: () => void
}

export default function Project({ details, onDelete, onBugCreate } : IProject) {
  
  const [inCreation, setInCreation] = useState<boolean>(false);
  const [bugTotal, setBugTotal] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutate: createBugMutate } = useCreateBug();

  // Setup Static Callbacks
  const handleStartCreate = useCallback(() => setInCreation(true), []);
  const handleCancelCreate = useCallback(() => setInCreation(false), []);
  const handleBugTotal = useCallback((bugAmount: number) => { setBugTotal(bugAmount)}, [])

  // Setup Dynamic Callbacks
  const onCreate = useCallback(async (bug: BugFormData) => {
    onBugCreate();  
    setInCreation(false);
    createBugMutate({...bug, project: details["_id"]});
  }, [onBugCreate, createBugMutate, details])

  return(
    <div>
      <CardContent className={`p-2`}>
        <Collapsible className={`rounded-3xl drop-shadow-subtle data-open:bg-gray-200 ${isOpen && "border-2 border-cc-green-2"}`} open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger render={<Button variant="ghost" className={`flex flex-col w-full h-auto py-3 aria rounded-3xl uppercase bg-gray-100 aria-expanded:bg-gray-200 hover:bg-gray-200`}>
            <div className="flex flex-row w-full justify-evenly min-w-0">
              <span className={`data-open:border-r-2 border-cc-red/60 ${!isOpen ? "truncate" : "text-wrap text-left"}`}>{details.title}</span>
              { (!isOpen && details.description) && (
                <div className="flex flex-row flex-1 text-gray-600 overflow-hidden">
                  <div className="mx-2 shrink-0">|</div>
                  <span className="line-clamp-1 truncate normal-case first-letter:capitalize">{details.description}</span>
                </div>
              )}
              <ChevronDownIcon className="group-data-panel-open/button:rotate-180 ml-auto shrink-0" />
            </div>
            { (isOpen && details.description) && (
              <div className={`flex flex-row w-full`}>
                <p className="normal-case font-normal first-letter:capitalize whitespace-normal text-left">{details.description}</p>
              </div>
            )}
            </Button>} /> 
          <CollapsibleContent className="justify-center rounded-3xl">
            { isOpen && (
              <div className={`flex flex-col gap-2 p-2 ${isOpen && "border-t-2 border-cc-green-2"}`}>
                {
                  inCreation ? (
                    <div className="py-4">
                      <BugWizard project={details} onCancel={handleCancelCreate} onSubmit={onCreate}/>
                    </div>
                  )
                  :
                  (
                    <>
                      { (bugTotal > 0) && <Button onClick={handleStartCreate} className={`aspect-square uppercase self-center my-2`}>Add Bug</Button>}
                      { (bugTotal === 0) && <CreateEmpty type="bug" onCreate={handleStartCreate}/> }
                      <Bugs projectId={details["_id"]} onUpdate={handleBugTotal} />
                      <div className="self-end"><ConfirmButton type="project" onConfirm={onDelete}/></div>
                    </>
                  )           
                }
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>      
    </div>
  )
}

export function ProjectsSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="h-7 w-[20%] bg-muted rounded-2xl" />
      <div className="h-7 w-full bg-muted rounded-2xl" />
      <div className="h-7 w-full bg-muted rounded-2xl" />
      <div className="h-7 w-full bg-muted rounded-2xl" />
    </div>
  )
}