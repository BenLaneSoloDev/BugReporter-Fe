import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TagInput from "./tagInput";

interface IProjectWizard {
  onSubmit: () => void
}

export default function ProjectWizard({ onSubmit } : IProjectWizard) {
  return (
    <div>
      <Card className="w-full min-w-md max-w-md">
        <form>
          <CardHeader>
            <div className="flex flex-row justify-between items-end">
              <CardTitle>Project Details</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="my-5">
            <div className="flex flex-col gap-5">
              <div className="grid gap-2">
                <Input
                  id="title"
                  type="text"
                  placeholder="Title"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Textarea
                  id="description"
                  placeholder="Description"
                  className="resize-none"
                />
              </div>
              <div className="flex flex-row gap-5">
                <div className="grid gap-2 flex-1 self-start">
                  <TagInput title="Development Areas" />
                </div>
                <div className="grid gap-2 flex-1 self-start">
                  <TagInput title="Environments" />
                </div>
              </div>
            </div>            
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" onClick={onSubmit} className="self-">
              Create Project
            </Button> 
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}