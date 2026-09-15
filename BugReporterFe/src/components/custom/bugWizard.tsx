import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
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


export default function BugWizard() {
  
  const [page, setPage] = useState(1);

  return (
    <div>
      <Card className="w-full min-w-md max-w-md">
        <CardHeader>
          <div className="flex flex-row justify-evenly items-end font-semibold">
            <h3 onClick={() => setPage(1)} className={`${page === 1 && "text-cc-red"} cursor-pointer`}>1</h3>
            <h3 onClick={() => setPage(2)} className={`${page === 2 && "text-cc-red"} cursor-pointer`}>2</h3>
            <h3 onClick={() => setPage(3)} className={`${page === 3 && "text-cc-red"} cursor-pointer`}>3</h3>
            <h3 onClick={() => setPage(4)} className={`${page === 4 && "text-cc-red"} cursor-pointer`}>4</h3>
          </div>
        </CardHeader>
        <CardContent>
          { page === 1 && <PageOne />}
          { page === 2 && <PageTwo />}
          { page === 3 && <PageThree />}
          { page === 4 && <PageFour />}
        </CardContent>
        <CardFooter className="flex flex-row gap-2">
          { page !== 1 && <Button onClick={() => setPage(page - 1)} type="button">Back</Button> }
          <div className="ml-auto">
            { page !== 4 ? (
              <Button onClick={() => setPage(page + 1)} type="button">Next</Button>
            )
            :
            (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}







// *   BUG WIZARD PAGES   *

function PageOne() {
  
  const anchor = useComboboxAnchor()

  // ! Change to be linked from the project
  const optionsD: string[] = ["UI", "UX"];
  const optionsE: string[] = ["Mac", "Windows"];

  return (
    <div className="flex flex-col gap-5 my-5">
      <Input
        id="title"
        type="text"
        placeholder="Title"
        required
      />
      <Combobox 
        id="developmentArea" 
        items={optionsD} 
        required
      >
        <ComboboxInput placeholder="Development Area" />
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
      <Combobox
        id="environments"
        items={optionsE}
        multiple
        autoHighlight
        required
      >
        <ComboboxChips ref={anchor}>
          <ComboboxValue>
            {(values) => (
              <>
                {values.map((value: string) => (
                  <ComboboxChip key={value}>{value}</ComboboxChip>
                ))}
                <ComboboxChipsInput placeholder={`${values.length === 0 ? "Environments" : ""}`}/>
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
    </div>
  );
}

function PageTwo() {
  
  const severityOptions: string[] = ["Low", "Normal", "High", "Extreme"];

  return (
    <div className="flex flex-col gap-5 my-5">
      <Combobox 
        id="Severity" 
        items={severityOptions} 
        required
      >
        <ComboboxInput placeholder="Severity" />
        <ComboboxContent>
          <ComboboxEmpty>No Severity found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <ListInput title="Steps to Reproduce"/>
    </div>
  );
}

function PageThree() {
  return (
    <div className="flex flex-col gap-5 my-5">
      <Textarea
        id="expectedBehaviour"
        placeholder="Expected Behaviour"
        required
        className="resize-none"
      />
      <Textarea
        id="actualBehaviour"
        placeholder="Actual Behaviour"
        required
        className="resize-none"
      />
    </div>
  );
}

function PageFour() {
  return (
    <div className="flex flex-col">
      <h2 className="self-center font-medium mb-4">Confirm Bug Details</h2>
      <div className="flex flex-col gap-1">
        <div className="text-black/50 font-medium">
          Title:
          <p className="inline ml-2 text-black font-normal capitalize">Bug Submission</p>
        </div>
        <div className="text-black/50 font-medium">
          Severity:
          <p className="inline ml-2 text-black font-normal capitalize">extreme</p>
        </div>  
        <div className="text-black/50 font-medium">
          Development Area:
          <p className="inline ml-2 text-black font-normal">UI</p>
        </div>
        <div className="text-black/50 font-medium">
          Environments:
          { Array.from({ length: 2 }).map((value, index: number) => (
            <p className="inline ml-2 text-black font-normal" key={`env${index}`}>UI</p>
            // ! add notch on all but last (to fill the gaps)
          ))}
        </div>
        <div className="text-black/50 font-medium">
          Steps to Reproduce:
          <ol className="list-decimal list-inside ml-2">
            { Array.from({ length: 4 }).map((value, index) => (
              <li className="text-black font-normal" key={`step${index}`}>UI</li>
            ))}
          </ol>
        </div>
        <div className="text-black/50 font-medium">
          Expected Behaviour:
          <p className="ml-2 text-black font-normal">Return to home page with data sent to the server</p>
        </div>
        <div className="text-black/50 font-medium">
          Actual Behaviour:
          <p className="ml-2 text-black font-normal">Page is stuck in the wizard, and no data is sent to the server</p>
        </div>
      </div> 
    </div> 
  );
}