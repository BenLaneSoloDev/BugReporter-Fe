import isLoggedIn from "@/utility/isLoggedIn";
import { Button } from "../../components/ui/button";
import dashboardImg from "./../../assets/dashboard-ss.png";

import { useNavigate } from "react-router-dom";
import Footer from "@/components/custom/footer";

export default function Home() {
  
  let navigate = useNavigate();
  const loggedIn = isLoggedIn();

  return (
    <div className="flex flex-col h-dvh">
      <div className="flex flex-col justify-center items-center h-full gap-5">
        <h1 className="font-bold text-5xl uppercase">Bug Reporter</h1>
        <p className="font-light text-2xl">A tool for tracking bugs within programming projects.</p>
        <img src={dashboardImg} className="w-[50%] border-y-2 py-5 border-cc-neutral"></img>
        { !loggedIn && (
          <div className="flex flex-row gap-5">
            <Button onClick={() => navigate("/login")}>Login</Button>
            <Button onClick={() => navigate("/signup")}>Signup</Button>
          </div>
        )}
        { loggedIn && <Button onClick={() => navigate("/dashboard")}>Dashboard</Button> }
      </div>
      <div className="flex flex-row justify-center items-end">
        <Footer />
      </div>
    </div>
  );
}