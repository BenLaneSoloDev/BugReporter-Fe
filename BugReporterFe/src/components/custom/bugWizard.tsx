import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxChip,
  ComboboxChips,
  ComboboxValue,
  ComboboxChipsInput,
  useComboboxAnchor
} from "@/components/ui/combobox"
import ListInput from "./listInput";
import { BugFormData, BugPageOneSchema, BugPageThreeSchema, BugPageTwoSchema, BugSchema, severityOptions } from "@/schema/bug.schema";
import { Control, Controller, FieldErrors, useForm, UseFormRegister, FormProvider, Form, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectImportData } from "@/schema/project.schema";
import { ca } from "zod/v4/locales";

  interface IBugWizard {
    project: ProjectImportData,
    onSubmit: (bug: BugFormData) => void
    onCancel: () => void
  }

  export default function BugWizard({ project, onSubmit, onCancel } : IBugWizard) {
    
    const [page, setPage] = useState(1);
    const [unlocks, setUnlocks] = useState<boolean[]>([true, false, false, false]);

    const formMethods  = useForm<BugFormData>({
      resolver: zodResolver(BugSchema),
      mode: "onChange",
      defaultValues: {
        title: "",
        developmentArea: "",
        severity: "normal",
        environmentsUsed: [],
        stepsToReproduce: [],
        expectedResult: "",
        actualResult: ""
      }
    });
    const { register, control, handleSubmit, reset, trigger, formState: { errors, isSubmitting } } = formMethods;

    const submitOne = async () => {
      
      const pageFields: (keyof BugFormData)[][] = [
        Object.keys(BugPageOneSchema.shape) as (keyof BugFormData)[],
        Object.keys(BugPageTwoSchema.shape) as (keyof BugFormData)[],
        Object.keys(BugPageThreeSchema.shape) as (keyof BugFormData)[]
      ]

      const isValid = await trigger(pageFields[page - 1])

      if (isValid) {
        setPage(page + 1);
        let unlocksCache = unlocks;
        unlocksCache[page] = true;
        setUnlocks(unlocksCache);
      }
    }

    const submitFull = async (data: BugFormData) => {
      onSubmit(data);
      reset();
    }

    return (
      <div>
        <Card className="w-full min-w-md max-w-md"> 
          <FormProvider {...formMethods} >
            <form onSubmit={handleSubmit(submitFull)}>
              <CardHeader className="flex flex-row items-center">
                <div className="flex flex-row justify-evenly items-end font-semibold w-full">
                  {unlocks[0] && <h3 onClick={() => setPage(1)} className={`${page === 1 ? "text-cc-red" : "cursor-pointer"}`}>1</h3>}
                  {unlocks[1] && <h3 onClick={() => setPage(2)} className={`${page === 2 ? "text-cc-red" : "cursor-pointer"}`}>2</h3>}
                  {unlocks[2] && <h3 onClick={() => setPage(3)} className={`${page === 3 ? "text-cc-red" : "cursor-pointer"}`}>3</h3>}
                  {unlocks[3] && <h3 onClick={() => setPage(4)} className={`${page === 4 ? "text-cc-red" : "cursor-pointer"}`}>4</h3>}
                </div>
                <Button onClick={onCancel} className={"aspect-square self-end"} size="xs" variant="destructive">X</Button> 
              </CardHeader>
              <CardContent className="my-4">
                { page === 1 && <PageOne register={register} errors={errors} control={control} project={project} />}
                { page === 2 && <PageTwo register={register} errors={errors} control={control} />}
                { page === 3 && <PageThree register={register} errors={errors} control={control} />}  
                { page === 4 && <PageFour />}
              </CardContent>
              <CardFooter className="flex flex-row gap-2">
                { page !== 1 && <Button onClick={() => setPage(page - 1)} type="button">Back</Button> }
                <div className="ml-auto" key={`pageButton${page}`}>
                  { page !== 4 ? (
                    <Button onClick={submitOne} type="button">Next</Button>
                  )
                  :
                  (
                    <Button type="submit" disabled={isSubmitting}>
                      { isSubmitting ? "Creating" : "Submit" }
                    </Button>
                  )}
                </div>
              </CardFooter>
            </form>
          </FormProvider>
        </Card>
      </div>
    );
  }







  // *   BUG WIZARD PAGES   *

  interface IPage {
    register: UseFormRegister<BugFormData>
    errors: FieldErrors<BugFormData>,
    control: Control<BugFormData>
  }

  interface IPageWithProject extends IPage {
    project: ProjectImportData
  }








  function PageOne({ register, errors, control, project } : IPageWithProject) {
    
    const anchor = useComboboxAnchor()
    const { developmentAreas, environments } = project;

    return (
      <div className="flex flex-col gap-5 my-5">
        <div>
          <Input
            id="title"
            type="text"
            placeholder="Title"
            {...register("title")}
          />
          {errors.title && (<p className="bg-cc-red/20 p-2 rounded-2xl mt-2">{errors.title.message}</p>)}
        </div>
        <Controller 
          name="developmentArea" 
          control={control} 
          render={({ field }) => (
            <div>
              <Combobox id="developmentArea" items={developmentAreas} value={field.value ?? ""} onValueChange={field.onChange}>
                <ComboboxInput placeholder="Development Area" onBlur={field.onBlur} />
                <ComboboxContent>
                  <ComboboxEmpty>No Development Areas found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              {errors.developmentArea && (<p className="bg-cc-red/20 p-2 rounded-2xl mt-2">{errors.developmentArea.message}</p>)}
            </div>
          )}
        />
        <Controller
          name="environmentsUsed"
          control={control}
          render={({ field }) => (
            <div>
              <Combobox id="environmentsUsed" items={environments} multiple autoHighlight value={field.value ?? []} onValueChange={field.onChange}>
                <ComboboxChips ref={anchor}>
                  <ComboboxValue>
                    {(values) => (
                      <>
                        {values.map((value: string) => (
                          <ComboboxChip key={value}>{value}</ComboboxChip>
                        ))}
                        <ComboboxChipsInput placeholder={`${values.length === 0 ? "Environments" : ""}`} onBlur={field.onBlur}/>
                      </>
                    )}
                  </ComboboxValue>
                </ComboboxChips>
                <ComboboxContent anchor={anchor}>
                  <ComboboxEmpty>No environments found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              {errors.environmentsUsed && (<p className="bg-cc-red/20 p-2 rounded-2xl mt-2">{errors.environmentsUsed.message}</p>)}
            </div>
          )}
        />
      </div>
    );
  }










  function PageTwo({ errors, control } : IPage) {

    const formatValue = (value: string): string => {
      return value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
    }

    return (
      <div className="flex flex-col gap-5 my-5">
          <Controller 
            name="severity"
            control={control}
            render={({ field }) => (
              <div>
                <Combobox 
                  id="severity" 
                  items={severityOptions}
                  value={field.value ?? severityOptions[1]}
                  onValueChange={field.onChange}
                >
                  <ComboboxInput placeholder="Severity" onBlur={field.onBlur} value={formatValue(field.value)}/>
                  <ComboboxContent>
                    <ComboboxEmpty>No Severity found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item} value={item} className={"capitalize"}>
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
                {errors.severity && (<p className="bg-cc-red/20 p-2 rounded-2xl mt-2">{errors.severity.message}</p>)}
              </div>
            )}
          />
        <Controller 
          name="stepsToReproduce"
          control={control}
          render={({ field }) => (
            <div>
              <ListInput title="Steps to Reproduce" value={field.value ?? []} onChange={field.onChange} onBlur={field.onBlur}/>
              {errors.stepsToReproduce && (<p className="bg-cc-red/20 p-2 rounded-2xl mt-2">{errors.stepsToReproduce.message}</p>)}
            </div>
          )}
        />
      </div>
    );
  }









  function PageThree({ register, errors } : IPage) {
    
    errors
    
    return (
      <div className="flex flex-col gap-5 my-5">
        <div>
          <Textarea
            id="expectedResult"
            placeholder="Expected Result"
            className="resize-none"
            {...register("expectedResult")}
          />
          {errors.expectedResult && (<p className="bg-cc-red/20 p-2 rounded-2xl mt-2">{errors.expectedResult.message}</p>)}
        </div>
        <div>
          <Textarea
            id="actualResult"
            placeholder="Actual Result"
            className="resize-none"
            {...register("actualResult")}
          />
          {errors.actualResult && (<p className="bg-cc-red/20 p-2 rounded-2xl mt-2">{errors.actualResult.message}</p>)}
        </div>
      </div>
    );
  }









  function PageFour() {

    const { getValues } = useFormContext<BugFormData>();
    const formData = getValues();

    return (
      <div className="flex flex-col">
        <h2 className="self-center font-medium mb-4">Confirm Bug Details</h2>
        <div className="flex flex-col gap-1">
          <div className="text-black/50 font-medium">
            Title:
            <p className="inline ml-2 text-black font-normal capitalize">{formData.title}</p>
          </div>
          <div className="text-black/50 font-medium">
            Severity:
            <p className="inline ml-2 text-black font-normal capitalize">{formData.severity}</p>
          </div>  
          <div className="text-black/50 font-medium">
            Development Area:
            <p className="inline ml-2 text-black font-normal">{formData.developmentArea}</p>
          </div>
          <div className="text-black/50 font-medium">
            Environments:
            { formData.environmentsUsed.map((value, index: number) => (
              <div className="inline" key={`div${index}`}>
                <p className="inline ml-2 text-black font-normal" key={`env${index}`}>{value}</p>
                { index !== formData.environmentsUsed.length - 1 && (<p className="inline ml-2" key={`p${index}`}>-</p>)}
              </div>
            ))}
          </div>
          <div className="text-black/50 font-medium">
            Steps to Reproduce:
            <ol className="list-decimal list-inside ml-2">
              { formData.stepsToReproduce.map((value, index) => (
                <li className="text-black font-normal" key={`step${index}`}>{value}</li>
              ))}
            </ol>
          </div>
          <div className="text-black/50 font-medium">
            Expected Behaviour:
            <p className="ml-2 text-black font-normal">{formData.expectedResult}</p>
          </div>
          <div className="text-black/50 font-medium">
            Actual Behaviour:
            <p className="ml-2 text-black font-normal">{formData.actualResult}</p>
          </div>
        </div> 
      </div> 
    );
  }