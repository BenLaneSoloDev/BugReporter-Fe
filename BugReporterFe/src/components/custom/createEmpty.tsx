import { IconFolderCode, IconBug } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

interface ICreateEmpty {
  type: "project" | "bug";
  onCreate: () => void;
}

export default function CreateEmpty({ type, onCreate } : ICreateEmpty) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          { type === "project" ? (
            <IconFolderCode />
          ) : (
            <IconBug />
          )}
        </EmptyMedia>
        <EmptyTitle className="capitalize">No {type}s Found</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any {type}s yet.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2 capitalize">
        <Button onClick={onCreate}>Create {type}</Button>
      </EmptyContent>
    </Empty>
  )
}