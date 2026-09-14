import { IconFolderCode } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

interface IProjectEmpty {
  onCreate: () => void
}

export default function ProjectEmpty({ onCreate } : IProjectEmpty) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconFolderCode />
        </EmptyMedia>
        <EmptyTitle>No Projects Found</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button onClick={onCreate}>Create Project</Button>
      </EmptyContent>
    </Empty>
  )
}