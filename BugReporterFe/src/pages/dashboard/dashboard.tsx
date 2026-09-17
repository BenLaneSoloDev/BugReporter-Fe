import Project from "@/components/custom/project";
import CreateEmpty from "@/components/custom/createEmpty";
import ProjectWizard from "@/components/custom/projectWizard";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "@/components/ui/toast";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchProjects } from "@/hooks/useFetchProjects.hook";
import { useCreateProject } from "@/hooks/useCreateProject.hook";
import { useDeleteProject } from "@/hooks/useDeleteProject.hook";
import { ProjectFormData, ProjectImportData } from "@/schema/project.schema";

export default function Dashboard() {
  
  const [limit, setLimit] = useState<string>("5");
  const [page, setPage] = useState<string>("1");
  const {data, refetch} = useFetchProjects({limit, page});

  const createProject = useCreateProject();
  const deleteProject = useDeleteProject();

  const [projects, setProjects] = useState<ProjectImportData[]>([]);
  const [inCreation, setInCreation] = useState<boolean>(false);
  
  const navigate = useNavigate();

  const onDelete = async (projectIndex: number) => {
    const projectsCache = [...projects];
    projectsCache.splice(projectIndex, 1);
    setProjects(projectsCache);
    deleteProject.mutate(projects[projectIndex]._id);
  }
  
  const onCreate = async (project: ProjectFormData) => {
    setInCreation(false);
    createProject.mutate(project);
  }

  function successToast(title: string) {
    toast.add({
      type: "Success",
      title: `${title} Created`
    })
  }

  useEffect(() => {
    if (createProject.isSuccess) {
      successToast("Project");
      refetch();
    }
  }, [createProject.isSuccess])

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
                <CreateEmpty type="project" onCreate={() => setInCreation(true)}/>
              )
              :
              (
                <div className="flex flex-row justify-center">
                  <ProjectWizard onCancel={() => setInCreation(false)} onSubmit={(proj) => onCreate(proj)} />
                </div>
              )
            }
          </div>
        ) 
        : // Above: No Projects | Below: Show Projects
        (
          <div className="my-auto">
            <h2 className="uppercase text-2xl text-center mb-2">Projects</h2>
            <div className="flex flex-col gap-1 mb-4">
              {
                projects.map((value, index) => (
                  <Project details={value} onDelete={() => onDelete(index)} onBugCreate={() => successToast("Bug")} key={`Project:${value._id}:${index}`} /> // Make this Project ID from Fetch
                ))
              }
            </div>
            {
              inCreation && 
              (
                <div className="flex flex-row justify-center">
                  <ProjectWizard onCancel={() => setInCreation(false)} onSubmit={(proj) => onCreate(proj)} />
                </div>
              )
            }
          </div>
        )
      }
      <Toaster />
    </div>
  );
}