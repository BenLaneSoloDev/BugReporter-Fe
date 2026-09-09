import Project from "@/components/custom/project";
import ProjectEmpty from "@/components/custom/projectEmpty";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  
  const navigate = useNavigate();

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