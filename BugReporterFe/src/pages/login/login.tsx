import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useNavigate } from "react-router-dom";

export default function Login() {
  
  let navigate = useNavigate();

  return (
    <div className="flex justify-center h-dvh items-center mx-5">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="flex flex-row justify-between items-end">
            <CardTitle>Login</CardTitle>
            <CardAction>
              <Button onClick={() => navigate("/signup")} variant="outline">Sign Up</Button>
            </CardAction>
          </div>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-3">
              <div className="grid gap-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Input id="password" type="password" placeholder="Password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button> 
        </CardFooter>
      </Card>
    </div>
  );
}