import { Button } from "../../components/ui/button";
export default function Home() {
  return (
    <>
      <h1>Bug Report Wizard</h1>
      <p>A tool used to track bugs within programming projects.</p>
      <img className="w-[100px] h-[100px] border-2"></img>
      <div>
        <Button>Login</Button>
        <Button>Signup</Button>
      </div>
    </>
  );
}