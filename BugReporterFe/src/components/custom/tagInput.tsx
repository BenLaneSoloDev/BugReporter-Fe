import { Badge } from "../ui/badge"
import { useState } from "react"

interface ITagInput {
  title?: string
  value: string[],
  onChange: (tags: string[]) => void
}

export default function TagInput({ title, value, onChange } : ITagInput) {
  
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  function removeTag(tagIndex: number): void {
    const tagsCache = [...tags];
    tagsCache.splice(tagIndex, 1);
    setTags(tagsCache);
    onChange?.(tagsCache);
  }

  function addTag(tag: string): void {
    setTags([...tags, tag]);
    onChange?.([...tags, tag]);
  }

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && input.length > 0) {
      event.preventDefault();
      addTag(input);
      setInput("");
    }
  }

  return (
    <div className="border p-1 rounded-xl">
      <li className="flex flex-row flex-wrap gap-1">
        {
          tags.map((value, index) => (
            <Badge key={`tag ${index}`} className="flex flex-row gap-1 w-auto h-auto py-1">
              <p className="px-2">{value}</p>
              <button type="button" onClick={() => {removeTag(index)}} className={"bg-cc-red/75 hover:bg-cc-red transition-colors h-full w-auto aspect-square rounded-full text-2xs"}>X</button>
            </Badge>
          ))
        }
        <input
          value={input}
          onKeyDown={handleEnter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInput(e.target.value) }}
          placeholder={input ? input : `Add ${tags.length === 0 ? title : "item"}...` }
          className="inline-block h-6.5 w-auto text-xs pl-2 min-w-10 field-sizing-content hover:underline hover:underline-offset-2 focus:outline-none"/>
      </li>
    </div>
  )
}