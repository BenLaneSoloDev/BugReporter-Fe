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
import Footer from "@/components/custom/footer";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginFormData } from "@/schema/login.schema";
import { useLogin } from "@/hooks/useLogin.hook";
import { useEffect } from "react";
import { Toaster, toast } from "@/components/ui/toast";

export default function Login() {

  const { mutate, isSuccess, isError } = useLogin();
  let navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    mutate(data);
  }

  useEffect(() => {
    if(isSuccess) {
      navigate("/dashboard");
    }
  }, [isSuccess]);    

  useEffect(() => {
    if(isError) {
      toast.add({
        type: "error",
        title: "Uh Oh! Your request failed",
        description: "Login credentials may be incorrect",
      })
    }
  }, [isError]);

  return (
    <div className="flex flex-col h-dvh items-center justify-center mx-5">
      <div className="flex flex-col justify-center h-full w-full">
        <a onClick={() => navigate("/")} className="uppercase self-center font-bold border-b-2 mb-4 cursor-pointer hover:text-cc-green-3 transition-colors duration-200">Bug Reporter</a>
        <Card className="w-full max-w-md self-center">
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
                    autoComplete="current-email"
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
                    autoComplete="current-password" 
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
        <Toaster />
      </div>
      <div className="flex flex-col justify-center items-end">
        <Footer />
      </div>
    </div>
  );
}