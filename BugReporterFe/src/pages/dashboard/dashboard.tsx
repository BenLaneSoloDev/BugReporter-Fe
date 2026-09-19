import Project, { ProjectsSkeleton } from "@/components/custom/project";
import CreateEmpty from "@/components/custom/createEmpty";
import ProjectWizard from "@/components/custom/projectWizard";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "@/components/ui/toast";
import Signout from "@/components/custom/signout";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchProjects } from "@/hooks/useFetchProjects.hook";
import { useCreateProject } from "@/hooks/useCreateProject.hook";
import { useDeleteProject } from "@/hooks/useDeleteProject.hook";
import { ProjectFormData, ProjectImportData } from "@/schema/project.schema";
import Footer from "@/components/custom/footer";

export default function Dashboard() {
  
  const [limit, setLimit] = useState<string>("5");
  const [page, setPage] = useState<string>("1");
  const {data, isLoading, refetch} = useFetchProjects({limit, page});

  const createProject = useCreateProject();
  const deleteProject = useDeleteProject();

  const [projects, setProjects] = useState<ProjectImportData[]>([]);
  const [dataFetched, setDataFetched] = useState<boolean>(false);
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

  useEffect(() => {
    if (!dataFetched && data) { setDataFetched(true) };
  }, [projects])

  return (
    <div className="flex flex-col gap-10 min-h-dvh">
      <div className="flex flex-col sm:flex-row justify-between px-5 pt-5 sm:px-10 sm:pt-10">
        <a onClick={() => navigate("/")} className="uppercase font-bold border-b-2 self-center sm:self-start cursor-pointer hover:text-cc-green-3 transition-colors duration-200">Bug Reporter</a>
        <div className="flex flex-row sm:flex-col self-center sm:self-end mt-5 sm:mt-0 gap-2">
          { projects.length > 0 &&  
            (
              <Button type="button" onClick={() => setInCreation(true)} className={`ml-auto`}>Create Project</Button>
            )
          }
          <div className="self-end"><Signout /></div>
        </div>
      </div>
      <div className="justify-start flex-1 my-0 px-5 sm:px-10">
        {
        data != null ? 
        (
          (projects.length === 0 && dataFetched) ? (
            <div>
              {
                inCreation ? (
                  <div className="flex flex-row justify-center">
                    <ProjectWizard onCancel={() => setInCreation(false)} onSubmit={(proj) => onCreate(proj)} />
                  </div>
                )
                :
                (
                  <CreateEmpty type="project" onCreate={() => setInCreation(true)}/>
                )
              }
            </div>
          ) 
          : // Above: No Projects | Below: Show Projects
          (
            <div className="my-auto">
              <h2 className="uppercase text-2xl text-center mb-2">Projects</h2>
              {
                inCreation && 
                (
                  <div className="flex flex-row justify-center my-6">
                    <ProjectWizard onCancel={() => setInCreation(false)} onSubmit={(proj) => onCreate(proj)} />
                  </div>
                )
              }
              <div className="flex flex-col items-center gap-1">
                {
                  projects.map((value, index) => (
                    <div className="min-w-0 w-full md:max-w-xl">
                      <Project details={value} onDelete={() => onDelete(index)} onBugCreate={() => {successToast("Bug"), refetch()}} key={value._id} />
                    </div>
                  ))
                }
              </div>
            </div>
          )
        )
        :
        (
          <ProjectsSkeleton />
        )}
      </div>
      <div className="flex flex-row justify-center items-end">
        <Footer />
      </div>
      <Toaster />
    </div>
  );
}