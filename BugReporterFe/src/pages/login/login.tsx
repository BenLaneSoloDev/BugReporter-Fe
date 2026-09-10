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

import { isSession, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginFormData } from "@/schema/login.schema";

export default function Login() {
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    const validInput = result.data.accessToken;
    if (validInput) navigate("/dashboard") // Loads into user dashboard
  }

  let navigate = useNavigate();

  return (
    <div className="flex flex-col h-dvh items-center justify-center mx-5">
      <a onClick={() => navigate("/")} className="uppercase font-bold border-b-2 mb-4 cursor-pointer hover:text-cc-green-3 transition-colors duration-200">Bug Reporter</a>
      <div className="">
        <Card className="w-full min-w-md max-w-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader>
              <div className="flex flex-row justify-between items-end">
                <CardTitle>Login</CardTitle>
                <CardAction>
                  <Button onClick={() => navigate("/signup")} variant="outline">Sign Up</Button>
                </CardAction>
              </div>
            </CardHeader>
            <CardContent className="my-3">
              <div className="flex flex-col gap-3">
                <div className="grid gap-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    required
                    {...register("email")}
                  />
                  {errors.email && (<p className="bg-cc-red/20 p-2 rounded-2xl">{errors.email.message}</p>)}
                </div>
                <div className="grid gap-2">
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Password" 
                    required 
                    {...register("password")}
                  />
                  {errors.password && (<p className="bg-cc-red/20 p-2 rounded-2xl">{errors.password.message}</p>)}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                { isSubmitting ? "Logging In" : "Login" }
              </Button> 
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}