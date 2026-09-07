import { Button } from "../../components/ui/button";
export default function Home() {
  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="flex flex-col items-center gap-5">
        <h1 className="font-bold text-5xl uppercase">Bug Reporter</h1>
        <p className="font-light text-2xl">A tool for tracking bugs within programming projects.</p>
        <img className="w-[400px] h-[200px] border-2 border-cc-neutral"></img>
        <div className="flex flex-row gap-5">
          <Button>Login</Button>
          <Button>Signup</Button>
        </div>
      </div>
    </div>
  );
}