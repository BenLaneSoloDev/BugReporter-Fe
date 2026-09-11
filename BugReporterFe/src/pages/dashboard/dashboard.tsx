import Project from "@/components/custom/project";
import ProjectEmpty from "@/components/custom/projectEmpty";
import ProjectWizard from "@/components/custom/projectWizard";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  
  const navigate = useNavigate();

  const projects: number = 0;
  
  return (
    <div className="p-10">
      {
        projects === 0 ? (
          <div>
            <ProjectEmpty />
            <div className="flex flex-row justify-center">
              <ProjectWizard />
            </div>
          </div>
        ) 
        : // Above: No Projects | Below: Show Projects
        (
          <div className="flex flex-col gap-20">
            <div className="flex flex-row">
              <a onClick={() => navigate("/")} className="uppercase font-bold border-b-2 self-start cursor-pointer hover:text-cc-green-3 transition-colors duration-200">Bug Reporter</a>
              <Button className={`ml-auto`}>Create Project</Button>
            </div>
            <div className="my-auto">
              <h2 className="uppercase text-2xl text-center">Projects</h2>
              <div className="flex flex-col gap-1">
                {
                  Array.from({ length: projects }).map((value, index) => (
                    <Project key={`Project${index}`} />
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