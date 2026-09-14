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

interface BugsProps {
  projectId: string;
}

export default function Bugs({ projectId } : BugsProps) {
  
  const [limit, setLimit] = useState<string>("5");
  const [page, setPage] = useState<string>("1");
  const {data, refetch} = useFetchBugs({limit, page, projectId});

  const [bugs, setBugs] = useState<BugGetData[]>([]);

  // TODO: When bug created, refetch GET request

  useEffect(() => {
    if (data) {
      setBugs(data.data); 
    }
  }, [data])

  return (
    <div>
      <div className="flex flex-col gap-3 items-center mb-2">
        { bugs.length > 0 && bugs.map((value, index) => (
          <Bug details={value} key={`Bug${index}`} />      
        ))}
      </div>
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
    </div>
  )
}