"use client";
import { api } from "@/services/api";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { log } from "console";
import Link from "next/link";
import {  useRouter } from "next/navigation";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";

export default function LoginScreen() {
    const [passwordShown, { toggle }] = useDisclosure();
    const form = useForm({
        initialValues: {
            email: "tanvir@gmail.com",
            password: "123456789",
        },
        validate: {
            email: (value) =>
                !/^\S+@\S+$/.test(value)
                    ? "Invalid email"
                    : !value && "Email is required",
            password: (value) =>
                !value
                    ? "Password required"
                    : value.length < 6 && "Password must be 6 length",
        },
    });
 const router = useRouter();

    const { mutate, error } = useMutation({
        mutationKey: ["login"],
        mutationFn: async (values: typeof form.values) => {
            return await api.post("/auth/login", values);
        },
        onError(error) {
            toast.error(error.message);
        },
        onSuccess(data) {
            let info = data.data.data;
            localStorage.setItem("token", info.token);
            localStorage.setItem("user", info.user);
            toast.success(`Welcome back ${info.user.firstName} ${info.user.lastName}`);
            router.push('/dashboard/overview');
        },
    });


    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className=" border p-5 rounded-lg w-1/2 max-w-sm border-gray-200 shadow-lg">
                <div className="my-5 space-y-2 text-center">
                    <h1 className=" text-4xl text-center">Sign In</h1>
                    <p className=" text-xs text-gray-400">
                        Sign in to your account with credentials
                    </p>
                </div>
                <form
                    className="space-y-3"
                    onSubmit={form.onSubmit((values) => {
                        mutate(values);
                    })}
                >
                    <TextInput
                        withAsterisk
                        label={"Email"}
                        placeholder="myaddress@mail.com"
                        {...form.getInputProps("email")}
                    />
                    <TextInput
                        withAsterisk
                        label={"Password"}
                        placeholder="your secret password"
                        {...form.getInputProps("password")}
                        type={passwordShown ? "text" : "password"}
                        rightSection={
                            passwordShown ? (
                                <FiEye onClick={toggle} />
                            ) : (
                                <FiEyeOff onClick={toggle} />
                            )
                        }
                    />
                    <div className=" space-y-2">
                        <p className="text-center text-red-500">{error?.message}</p>
                        <Button fullWidth type="submit">
                            Login
                        </Button>
                    </div>

                    <p className=" text-sm text-center">
                        No account ?{" "}
                        <Link href={"/auth/register"}>
                            <span className="underline cursor-pointer">
                                create one
                            </span>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
