import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TagInput from "./tagInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectFormData } from "@/schema/project.schema";
import { Controller, useForm } from "react-hook-form";
import { ProjectSchema } from "@/schema/project.schema";

interface IProjectWizard {
  onSubmit: (proj: ProjectFormData) => void
  onCancel: () => void
}

export default function ProjectWizard({ onSubmit, onCancel } : IProjectWizard) {
  
  const { register, control, handleSubmit, reset, formState: { errors, isSubmitting } }  = useForm<ProjectFormData>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title: "",
      developmentAreas: [],
      environments: []
    }
  });
  
  const submit = async (data: ProjectFormData) => {
    onSubmit(data);
    reset();
  }

  return (
    <div>
      <Card className="w-full min-w-md max-w-md">
        <form onSubmit={handleSubmit(submit)}>
          <CardHeader>
            <div className="flex flex-row justify-between items-end">
              <CardTitle>Project Details</CardTitle>
              <Button onClick={onCancel} size={"xs"} className={"aspect-square"} variant="destructive">X</Button>
            </div>
          </CardHeader>
          <CardContent className="my-5">
            <div className="flex flex-col gap-5">
              <div className="grid gap-2">
                <Input
                  id="title"
                  type="text"
                  placeholder="Title"
                  {...register("title")}
                />
                {errors.title && (<p className="bg-cc-red/20 p-2 rounded-2xl">{errors.title.message}</p>)}
              </div>
              <div className="grid gap-2">
                <Textarea
                  id="description"
                  placeholder="Description"
                  className="resize-none"
                  {...register("description")}
                />
              </div>
              <div className="flex flex-row gap-5">
                <Controller 
                  name="developmentAreas"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="grid gap-2 flex-1 self-start">
                      <TagInput 
                        title="Development Areas" 
                        value={field.value ?? []}
                        onChange={field.onChange}
                      />
                      {fieldState.error && (<p className="bg-cc-red/20 p-2 rounded-2xl">{fieldState.error.message}</p>)}
                    </div>
                  )}
                />
                <Controller 
                  name="environments"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="grid gap-2 flex-1 self-start">
                      <TagInput 
                        title="Environments" 
                        value={field.value ?? []}
                        onChange={field.onChange}
                      />
                      {fieldState.error && (<p className="bg-cc-red/20 p-2 rounded-2xl">{fieldState.error.message}</p>)}
                    </div>
                  )}
                />
              </div>
            </div>            
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="self-center" disabled={isSubmitting}>
              { isSubmitting ? "Creating" : "Create Project" }
            </Button> 
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}