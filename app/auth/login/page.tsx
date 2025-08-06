"use client";
import { api } from "@/services/api";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { AxiosError } from "axios";
import Link from "next/link";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";

export default function LoginScreen() {
    const [passwordShown, { toggle }] = useDisclosure();
    const [error, setError] = useState("");
    const form = useForm({
        initialValues: {
            email: "",
            password: "",
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

    const handleSubmit = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        try {
            const res = await api.post("/auth/login", { email, password });
            console.log(res.data);
            setError("");
        } catch (error) {
            if (error instanceof AxiosError) {
                let message =
                    error.response?.data.error ||
                    error.message ||
                    "Something went wrong";
                toast.error(message);
                setError(message);
            }
        }
    };

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
                    onSubmit={form.onSubmit(handleSubmit)}
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
                        <p className="text-center text-red-500">{error}</p>
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
