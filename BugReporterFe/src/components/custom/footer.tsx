import { Button } from "../ui/button"

export default function Footer() {
  return (
    <div className="mb-10">
      <Button className="capitalize bg-cc-green-2 hover:bg-cc-green-1" asChild>
        <a 
          href="https://ben-lane-portfolio-uba9-seven.vercel.app/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Check out my other projects here
        </a>
      </Button>
    </div>
  )
}