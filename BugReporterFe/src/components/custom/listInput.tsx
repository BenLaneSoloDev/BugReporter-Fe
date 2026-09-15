import { Input } from "../ui/input";
import { useState } from "react"

interface IListInput {
  title?: string
  value?: string[],
  onChange?: (tags: string[]) => void
}

// ! NEED TO MAKE value AND onChange required when setting up form

export default function ListInput({ title, value, onChange } : IListInput) {
  
  const [items, setItems] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  function removeItem(itemIndex: number): void {
    const itemsCache = [...items];
    itemsCache.splice(itemIndex, 1);
    setItems(itemsCache);
    onChange?.(itemsCache);
  }

  function addItem(item: string): void {
    setItems([...items, item]);
    onChange?.([...items, item]);
  }

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && input.length > 0) {
      event.preventDefault();
      addItem(input);
      setInput(""); 
    }
  }

  return (
    <div>
      <Input
          id="title"
          value={input}
          type="text"
          placeholder={title}
          onKeyDown={handleEnter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInput(e.target.value) }}
        />
      <ol className={`list-decimal list-inside pl-2`}>
        {
          items.map((value, index) => (
            <li key={`tag ${index}`} className={`flex flex-row gap-1 w-auto h-auto py-1 my-1 ${(items.length > 0 && index !== items.length - 1) && "border-b"}`}>
              <p className="font-normal" key={`step${index}`}>{`${index + 1}.`} {value}</p>
              <button type="button" onClick={() => {removeItem(index)}} className={"bg-cc-red/75 hover:bg-cc-red transition-colors h-full w-auto aspect-square rounded-full self-start text-xs p-1 ml-auto leading-0"}>X</button>
            </li>
          ))
        }
      </ol>
    </div>
  )
}