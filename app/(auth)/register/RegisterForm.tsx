"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { SignupFormValues, signupSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signUp } from "@/lib/auth";
import { useRouter } from "next/navigation";

function RegisterForm() {
    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });
  const router = useRouter();
  const onSubmit = async (data: SignupFormValues)=>{
    try {
        const result = await signUp(data);
        console.log(result);
        router.push("/login");
    } catch (error: any) {
        toast.error(error.message || "Login failed");
    }
  }
  return (
    <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>
            Sign up to start using the blog platform.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form id="signup-form" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Username */}
              <Field data-invalid={!!errors.username}>
                <FieldLabel>Username</FieldLabel>
                <Input
                  {...register("username")}
                  placeholder="john_doe"
                  aria-invalid={!!errors.username}
                />
                {errors.username && (
                  <FieldError errors={[errors.username]} />
                )}
              </Field>

              {/* Email */}
              <Field data-invalid={!!errors.email}>
                <FieldLabel>Email</FieldLabel>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="john@example.com"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <FieldError errors={[errors.email]} />}
              </Field>

              {/* Password */}
              <Field data-invalid={!!errors.password}>
                <FieldLabel>Password</FieldLabel>
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                />
                {errors.password && (
                  <FieldError errors={[errors.password]} />
                )}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button
            type="submit"
            form="signup-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Sign Up"}
          </Button>
        </CardFooter>
      </Card>
  )
}

export default RegisterForm