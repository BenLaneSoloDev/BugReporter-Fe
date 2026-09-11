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
import Tag from "./tag";


export default function ProjectWizard() {
  return (
    <div>
      <Card className="w-full min-w-md max-w-md">
        <form>
          <CardHeader>
            <div className="flex flex-row justify-between items-end">
              <CardTitle>Create an Account</CardTitle>
              <CardAction>
                <Button variant="outline">Login</Button>
              </CardAction>
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
              <div className="flex flex-row justify-between">
                <div className="grid gap-2">
                  <Input
                    id="developmentAreas"
                    type="text"
                    placeholder="Development Areas"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Input 
                    id="environments" 
                    type="text" 
                    placeholder="Environments" 
                    required
                  />
                </div>
              </div>
            </div>            
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="self-start">
              Create Project
            </Button> 
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}