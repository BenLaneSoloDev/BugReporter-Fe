import { Input } from "../ui/input";
import { useState, useEffect } from "react"
import { Button } from "../ui/button";

interface IListInput {
  title?: string
  value?: string[],
  onChange?: (items: string[]) => void
  onBlur?: () => void
}

// ! NEED TO MAKE value AND onChange required when setting up form

export default function ListInput({ title, value = [], onChange, onBlur } : IListInput) {
  
  const [items, setItems] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  function removeItem(itemIndex: number): void {
    const itemsCache = [...items];
    itemsCache.splice(itemIndex, 1);
    setItems(itemsCache);
    onChange?.(itemsCache);
    onBlur?.();
  }

  function addItem(item: string): void {
    const itemsCache = [...items, item];
    setItems(itemsCache);
    onChange?.(itemsCache);
    onBlur?.();
  }

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && input.length > 0) {
      event.preventDefault();
      addItem(input);
      setInput(""); 
    }
  }

  useEffect(() => {
    setItems(value);
  }, [value]);

  return (
    <div>
      <Input
          id="title"
          value={input}
          type="text"
          placeholder={`${title} ${items.length >= 10 ? "(Max 10)" : ""}`}
          onKeyDown={handleEnter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInput(e.target.value) }}
          onBlur={onBlur}
          disabled={items.length >= 10}
        />
      <ol className={`list-decimal list-inside pl-2`}>
        {
          items.map((value, index) => (
            <li key={`tag ${index}`} className={`flex flex-row gap-1 w-auto h-auto py-1 my-1 ${(items.length > 0 && index !== items.length - 1) && "border-b"}`}>
              <p className="font-normal" key={`step${index}`}>{`${index + 1}.`} {value}</p>
              <Button type="button" onClick={() => {removeItem(index)}} size={"xs"} variant="default" className={"aspect-square bg-cc-red hover:bg-cc-red/80 self-start text-xs ml-auto leading-0"}>X</Button>
            </li>
          ))
        }
      </ol>
    </div>
  )
}