import Bug, { BugSkeleton, BugsSkeleton } from "./bug.tsx"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { useState, useEffect } from "react";
import { useFetchBugs } from "@/hooks/useFetchBugs.hook.ts";
import { BugGetData } from "@/schema/bug.schema.ts";
import { useDeleteBug } from "@/hooks/useDeleteBug.hook.ts";

interface BugsProps {
  projectId: string;
  onUpdate: (bugAmount: number) => void
  reload: boolean;
}

export default function Bugs({ projectId, onUpdate, reload } : BugsProps) {
  
  const [limit, setLimit] = useState<string>("5");
  const [page, setPage] = useState<string>("1");
  const [bugs, setBugs] = useState<BugGetData[]>([]);

  const {data, refetch} = useFetchBugs({limit, page, projectId});
  const deleteBug = useDeleteBug();

  const onDelete = async (bugIndex: number) => {
    const bugsCache = [...bugs];
    bugsCache.splice(bugIndex, 1);
    setBugs(bugsCache);
    deleteBug.mutate(bugs[bugIndex]._id);
  }

  const goToPage = (page: string) => {
    setBugs([]);
    onUpdate(-1);
    setPage(page);
  }

  useEffect(() => {
    if(reload) {
      refetch();
    }
  }, [reload])

  useEffect(() => {
    if(deleteBug.isSuccess) refetch();
  }, [deleteBug.isSuccess])

  useEffect(() => {
    if (data) {
      setBugs(data.data); 
      onUpdate(data.data.length);
    }
  }, [data])

  return (
    <div className="mb-2">
      <div className="flex flex-col gap-3 items-center">
        { (bugs.length > 0) && bugs.map((value, index) => (
          <Bug details={value} onDelete={() => onDelete(index)} key={`Bug:${value._id}:${index}`} />      
        ))}
        { (bugs.length > 0) && Array.from({ length: 5 - bugs.length }).map((_value, index) => (
          <div className="w-full invisible" key={`div${index}`}><BugSkeleton key={`bugSkeleton${index}`} /></div>
        ))}
      </div>
      { (bugs.length > 0) && (
        <div className="mt-3">
          { (data && (data.pagination.meta.totalPages > 1)) && (
            <Pagination>
              <PaginationContent>
                { data.pagination.meta.currentPage > 1 ? (
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
                { data.pagination.meta.currentPage < data.pagination.meta.totalPages ? (
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