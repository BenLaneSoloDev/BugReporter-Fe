import Bug, { BugsSkeleton } from "./bug.tsx"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { useState, useEffect, useCallback } from "react";
import { useFetchBugs } from "@/hooks/useFetchBugs.hook.ts";
import { BugGetData } from "@/schema/bug.schema.ts";
import { useDeleteBug } from "@/hooks/useDeleteBug.hook.ts";
import React from "react";

interface BugsProps {
  projectId: string;
  onUpdate: (bugAmount: number) => void;
}

function Bugs({ projectId, onUpdate } : BugsProps) {
  
  const [limit, _setLimit] = useState<string>("5");
  const [page, setPage] = useState<string>("1");

  const {data } = useFetchBugs({limit, page, projectId});
  const { mutate: deleteBug }= useDeleteBug();

  const bugs: BugGetData[] = data?.data ?? [];
  const meta = data?.pagination?.meta;

  useEffect(() => {
    if (data) 
    {
      onUpdate(bugs.length);
    }
  }, [data, onUpdate])

  const goToPage = useCallback((page: string) => {
    setPage(page);
  }, []);

  const handleDelete = useCallback((bugIndex: number) => {  
    deleteBug(bugs[bugIndex]._id, {
      onSuccess: () => {
        if (bugs.length === 1 && parseInt(page) > 1) {
          goToPage((parseInt(page) - 1).toString());
        }
      }
    });
  }, [deleteBug, bugs.length, page, goToPage])

  if (bugs.length < 0 || !data) {
    return <BugsSkeleton />
  }

  return (
    <div className="mb-2">
      <div className="flex flex-col gap-3 items-center">
        { (bugs.length > 0) && bugs.map((value, index) => (
          <Bug details={value} onDelete={() => handleDelete(index)} key={value._id} />      
        ))}
        { (bugs.length > 0) && Array.from({ length: 5 - bugs.length }).map((_value, index) => (
          <div className="w-full invisible" key={`div${index}`}><div className="h-7 w-[20%] bg-muted rounded-2xl" key={`bugBlank${index}`} /></div>
        ))}
      </div>
      { (bugs.length > 0) && (
        <div className="mt-3">
          { (data && (meta.totalPages > 1)) && (
            <Pagination>
              <PaginationContent>
                { meta.currentPage > 1 ? (
                  <PaginationItem>
                    <PaginationPrevious onClick={() => goToPage((parseInt(page) - 1).toString())} />
                  </PaginationItem>
                )
                :
                (
                  <PaginationItem>
                    <PaginationLink className="invisible"/>
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink isActive>{page}</PaginationLink>
                </PaginationItem>
                { meta.currentPage < meta.totalPages ? (
                  <PaginationItem>
                    <PaginationNext onClick={() => goToPage((parseInt(page) + 1).toString())} />
                  </PaginationItem>
                )
                :
                (
                  <PaginationItem>
                    <PaginationLink className="invisible"/>
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </div>
      )}
    </div>
  )
}

export default React.memo(Bugs);