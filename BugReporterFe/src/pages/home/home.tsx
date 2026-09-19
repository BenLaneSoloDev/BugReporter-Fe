import isLoggedIn from "@/utility/isLoggedIn";
import { Button } from "../../components/ui/button";

import { useNavigate } from "react-router-dom";
import Footer from "@/components/custom/footer";
import Signout from "@/components/custom/signout";

export default function Home() {
  
  let navigate = useNavigate();
  const loggedIn = isLoggedIn();

  return (
    <div className="flex flex-col min-h-dvh">
      <div className="flex flex-col justify-center items-center flex-1 gap-3 md:gap-5">
        <h1 className="font-bold text-3xl md:text-5xl uppercase mt-10">Bug Reporter</h1>
        <p className="font-light max-w-[90%] text-center text-lg md:text-2xl">A tool for tracking bugs within programming projects.</p>
        <picture className="w-[95%] sm:px-0 border-y-2 py-5 border-cc-neutral sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%]">
          <source media="(min-width: 640px)" srcSet="/dashboard-ss.webp"/>
          <img src={"/dashboard-ss-m.webp"} loading="eager" fetchPriority="high"></img>
        </picture>
        { !loggedIn && (
          <div className="flex flex-row gap-5">
            <Button onClick={() => navigate("/login")}>Login</Button>
            <Button onClick={() => navigate("/signup")}>Signup</Button>
          </div>
        )}
        { loggedIn && (
          <div className="flex flex-row gap-5">
            <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
            <Signout />
          </div> 
        )}
      </div>
      <div className="flex flex-row justify-center items-end">
        <Footer />
      </div>
    </div>
  );
}