import { Button } from "../ui/button";
import { CardContent } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDownIcon, Turntable } from "lucide-react"
import ConfirmButton from "./confirmButton";
import CreateEmpty from "./createEmpty";

import BugWizard from "@/components/custom/bugWizard";
import Bugs from "./bugs";
import { ProjectImportData } from "@/schema/project.schema";
import { BugFormData } from "@/schema/bug.schema";
import { useCreateBug } from "@/hooks/useCreateBug.hook";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { BugsSkeleton } from "./bug";

interface IProject {
  details: ProjectImportData,
  onDelete: () => void
  onBugCreate: () => void
}

export default function Project({ details, onDelete, onBugCreate } : IProject) {
  
  const [inCreation, setInCreation] = useState<boolean>(false);
  const [bugTotal, setBugTotal] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
            <div className={`flex flex-col gap-2 p-2 ${isOpen && "border-t-2 border-cc-green-2"}`}>
              {
                inCreation ? (
                  <div className="py-4">
                    <BugWizard project={details} onCancel={() => setInCreation(false)} onSubmit={(bug) => onCreate(bug)}/>
                  </div>
                )
                :
                (
                  <>
                    { (bugTotal > 0) && <Button onClick={() => setInCreation(true)} className={`aspect-square uppercase self-center my-2`}>Add Bug</Button>}
                    { (bugTotal === 0) && <CreateEmpty type="bug" onCreate={() => setInCreation(true)}/> }
                    { bugTotal < 0 && <BugsSkeleton /> }
                    <Bugs projectId={details["_id"]} onUpdate={(bugAmount: number) => setBugTotal(bugAmount)} reload={!inCreation}/>
                    <div className="self-end"><ConfirmButton type="project" onConfirm={onDelete}/></div>
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
    <div className="w-full">
      <CardContent className={`p-2 w-full`}>
        <Collapsible className={`rounded-3xl drop-shadow-subtle `}>
          <CollapsibleTrigger render={<Button variant="ghost" className={`w-full h-auto py-3 rounded-3xl uppercase bg-gray-100 hover:bg-gray-100`}>
            <Skeleton className="h-4 w-[55%]" />
            <div className="ml-auto"></div>
            <Skeleton className="h-4 w-[5%]" />
          </Button>} /> 
        </Collapsible>
      </CardContent>
    </div>
  )
}

export function ProjectsSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Skeleton className="h-6 w-[20%]"/>
      <ProjectSkeleton />
      <ProjectSkeleton />
      <ProjectSkeleton />
    </div>
  )
}