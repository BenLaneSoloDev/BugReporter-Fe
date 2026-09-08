import Project from "@/components/custom/project";
import ProjectEmpty from "@/components/custom/projectEmpty";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  
  const projects: number = 4;
  
  return (
    <div className="p-10">
      {
        projects === 0 ? (
          <ProjectEmpty />
        ) 
        : // Above: No Projects | Below: Show Projects
        (
          <div className="flex flex-col gap-20">
            <Button className={`ml-auto`}>Create Project</Button>
            <div className="my-auto">
              <h2 className="uppercase text-2xl text-center">Projects</h2>
              <div className="flex flex-col gap-1">
                {
                  Array.from({ length: projects }).map(() => (
                    <Project />
                  ))
                }
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}