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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema, SignupFormData } from "@/schema/signup.schema";
import { useSignup } from "@/hooks/useSignup.hook";
import { useEffect } from "react";
import { Toaster, toast } from "@/components/ui/toast";

export default function Signup() {

  const { mutate, isError, isSuccess } = useSignup();
  let navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: SignupFormData) => {
    mutate(data);
    reset();
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
        description: "This user may already exist",
      })
    }
  }, [isError]);

  return (
    <div className="flex flex-col justify-center h-dvh items-center mx-5">
      <a onClick={() => navigate("/")} className="uppercase font-bold border-b-2 mb-4 cursor-pointer hover:text-cc-green-3 transition-colors duration-200">Bug Reporter</a>
      <div>
        <Card className="w-full min-w-md max-w-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader>
              <div className="flex flex-row justify-between items-end">
                <CardTitle>Create an Account</CardTitle>
                <CardAction>
                  <Button onClick={() => navigate("/login") } variant="outline">Login</Button>
                </CardAction>
              </div>
            </CardHeader>
            <CardContent className="my-3">
              <div className="flex flex-col gap-3">
                <div className="grid gap-2">
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    required
                    {...register("firstName")}
                  />
                  {errors.firstName && (<p className="bg-cc-red/20 p-2 rounded-2xl">{errors.firstName.message}</p>)}
                </div>
                <div className="grid gap-2">
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    {...register("lastName")}
                  />
                  {errors.lastName && (<p className="bg-cc-red/20 p-2 rounded-2xl">{errors.lastName.message}</p>)}
                </div>
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
                { isSubmitting ? "Creating Account" : "Sign Up" }
              </Button> 
            </CardFooter>
          </form>
        </Card>
        <Toaster />
      </div>
    </div>
  );
}