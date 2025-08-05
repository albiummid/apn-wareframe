"use client";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginScreen() {
    const [passwordShown, { toggle }] = useDisclosure();
    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },
    });

    const handleSubmit = async (values: {
        email: string;
        password: string;
    }) => {
        console.log(values);
        
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
                    className=" space-y-3"
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
                    <div className="flex justify-center items-center mt-10">
                        <Button fullWidth type="submit">
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
