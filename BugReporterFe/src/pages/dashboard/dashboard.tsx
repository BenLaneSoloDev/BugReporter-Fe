import Project from "@/components/custom/project";
import ProjectEmpty from "@/components/custom/projectEmpty";
import ProjectWizard from "@/components/custom/projectWizard";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchProjects } from "@/hooks/useFetchProjects.hook";
import { ProjectFormData, ProjectImportData } from "@/schema/project.schema";

export default function Dashboard() {
  
  const [limit, setLimit] = useState<string>("5");
  const [page, setPage] = useState<string>("1");
  const {data, isError, isSuccess, isPending, error} = useFetchProjects({limit, page});

  const [projects, setProjects] = useState<ProjectImportData[]>([]);
  const [inCreation, setInCreation] = useState<boolean>(false);
  
  const navigate = useNavigate();

  function deleteProject(projectIndex: number): void {
    const projectsCache = [...projects];
    projectsCache.splice(projectIndex, 1);
    setProjects(projectsCache);
  }
  
  function createProject(newProject: ProjectFormData) {
    setInCreation(false);
    setProjects([...projects, {...newProject, _id: "x"}]);
  }

  useEffect(() => {
    if (data) {
      setProjects(data.data); 
    }
  }, [data])

  return (
    <div className="flex flex-col gap-20 p-10">
      <div className="flex flex-row">
        <a onClick={() => navigate("/")} className="uppercase font-bold border-b-2 self-start cursor-pointer hover:text-cc-green-3 transition-colors duration-200">Bug Reporter</a>
        { projects.length > 0 && 
          (
            <Button type="button" onClick={() => setInCreation(true)} className={`ml-auto`}>Create Project</Button>
          )
        }
      </div>
      {
        projects.length === 0 ? (
          <div>
            {
              !inCreation ? (
                <ProjectEmpty onCreate={() => setInCreation(true)}/>
              )
              :
              (
                <div className="flex flex-row justify-center">
                  <ProjectWizard onSubmit={(proj) => createProject(proj)} />
                </div>
              )
            }
          </div>
        ) 
        : // Above: No Projects | Below: Show Projects
        (
          <div className="my-auto">
            <h2 className="uppercase text-2xl text-center">Projects</h2>
            <div className="flex flex-col gap-1 mb-4">
              {
                projects.map((value, index) => (
                  <Project details={value} onDelete={() => deleteProject(index)} key={`proj${index}`} /> // Make this Project ID from Fetch
                ))
              }
            </div>
            {
              inCreation && 
              (
                <div className="flex flex-row justify-center">
                  <ProjectWizard onSubmit={(proj) => createProject(proj)} />
                </div>
              )
            }
          </div>
        )
      }
    </div>
  );
}