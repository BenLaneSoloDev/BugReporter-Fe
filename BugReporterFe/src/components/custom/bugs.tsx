import Bug from "./bug.tsx"
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
}

export default function Bugs({ projectId } : BugsProps) {
  
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

  // TODO: When bug created, refetch GET request

  useEffect(() => {
    if(deleteBug.isSuccess) refetch();
  }, [deleteBug.isSuccess])

  useEffect(() => {
    if (data) {
      setBugs(data.data); 
    }
  }, [data])

  return (
    <div>
      <div className="flex flex-col gap-3 items-center mb-2">
        { bugs.length > 0 && bugs.map((value, index) => (
          <Bug details={value} onDelete={() => onDelete(index)} key={`Bug:${value.title}:${index}`} />      
        ))}
      </div>
      { bugs.length > 0 && (
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}