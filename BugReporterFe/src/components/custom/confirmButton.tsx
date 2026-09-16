import { Trash2Icon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface IConfirmButton {
  type: "bug" | "project";
  size?: "sm" | "xs"
  onConfirm?  : () => void;
}

export default function ConfirmButton({ type, size = "sm", onConfirm } : IConfirmButton) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="default" size={size} className={"bg-cc-red hover:bg-cc-red/80 capitalize"}>Delete {type}</Button>}
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle className={`capitalize`}>Delete {type}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this {type}. Are you sure?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="default" className={"bg-cc-green-1/50 hover:bg-cc-green-1"}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} variant="default" className={"bg-cc-red hover:bg-cc-red/80"}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}