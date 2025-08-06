"use client";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function RegisterScreen() {
    const [passwordShown, { toggle: togglePasswordShown }] = useDisclosure();
    const [confirmPasswordShown, { toggle: toggleConfirmPasswordShown }] =
        useDisclosure();
    const form = useForm({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validate: {
            confirmPassword: (value, values) =>
                value !== values.password ? "Passwords did not match" : null,
        },
    });

    const handleSubmit = async (values: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        confirmPassword: string;
    }) => {
        console.log(values);
    };
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className=" border p-5 rounded-lg w-1/2 max-w-sm border-gray-200 shadow-lg">
                <div className="my-5 space-y-2 text-center">
                    <h1 className=" text-4xl text-center"> Registration </h1>
                    <p className=" text-xs text-gray-400">
                        Sign Up to your account with credentials
                    </p>
                </div>
                <form
                    className=" space-y-3"
                    onSubmit={form.onSubmit(handleSubmit)}
                >
                    <div className="flex justify-between items-center gap-2">
                        <TextInput
                            withAsterisk
                            label={"First Name"}
                            placeholder="Enter Your First Name"
                            {...form.getInputProps("firstName")}
                        />
                        <TextInput
                            withAsterisk
                            label={"Last Name"}
                            placeholder="Enter Your Last Name"
                            {...form.getInputProps("lastName")}
                        />
                    </div>
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
                            <div onClick={togglePasswordShown}>
                                {passwordShown ? <FiEye /> : <FiEyeOff />}
                            </div>
                        }
                    />
                    <TextInput
                        withAsterisk
                        label={"Confirm Password"}
                        placeholder="your secret password"
                        {...form.getInputProps("confirmPassword")}
                        type={confirmPasswordShown ? "text" : "password"}
                        rightSection={
                            <div onClick={toggleConfirmPasswordShown}>
                                {confirmPasswordShown ? (
                                    <FiEye />
                                ) : (
                                    <FiEyeOff />
                                )}
                            </div>
                        }
                    />
                    <div className="flex justify-center items-center mt-10">
                        <Button fullWidth type="submit">
                            Register
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
