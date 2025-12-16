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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "./schema";
import Link from "next/link";
import { saveAuth } from "@/lib/storage";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";




function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onBlur",
    });
    const router = useRouter();

    async function onSubmit(data: LoginFormValues) {
        try {
            const result = await login(data);
            const userData = {...result, email: data.email}
            saveAuth(userData);
            toast.success("Logged in successfully 🎉");
            router.push("/dashboard");
        } catch (error: any) {
            toast.error(error.message || "Login failed");
        }
    }
    return (
        <>
            <Card className="w-full sm:max-w-md">
                <CardHeader>
                    <CardTitle>Login Account</CardTitle>
                    <CardDescription>
                        Sign in to start using the blog platform.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>
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

                <CardFooter className="flex flex-col gap-2">
                    <div className="w-full flex justify-between">
                        <Button type="submit" form="login-form" disabled={isSubmitting}>
                            {isSubmitting ? "Logging in..." : "Login"}
                        </Button>
                    </div>

                    {/* Create account link */}
                    <div className="text-center mt-2">
                        <Button variant="link" asChild className="text-sm">
                            <Link href="/register">Create Account</Link>
                        </Button>
                    </div>
                </CardFooter>

            </Card>
        </>
    )
}

export default LoginForm