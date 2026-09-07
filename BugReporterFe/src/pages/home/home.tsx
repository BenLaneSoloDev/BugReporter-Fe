import { Button } from "../../components/ui/button";

import { useNavigate } from "react-router-dom";

export default function Home() {
  
  let navigate = useNavigate();
  
  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="flex flex-col items-center gap-5">
        <h1 className="font-bold text-5xl uppercase">Bug Reporter</h1>
        <p className="font-light text-2xl">A tool for tracking bugs within programming projects.</p>
        <img className="w-[400px] h-[200px] border-2 border-cc-neutral"></img>
        <div className="flex flex-row gap-5">
          <Button onClick={() => navigate("/login")}>Login</Button>
          <Button onClick={() => navigate("/signup")}>Signup</Button>
        </div>
        <Button onClick={() => navigate("/dashboard")}>Dashboard (dev)</Button>
      </div>
    </div>
  );
}