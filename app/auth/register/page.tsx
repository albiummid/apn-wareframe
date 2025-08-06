"use client";
import { api } from "@/services/api";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";

export default function RegisterScreen() {
    const [passwordShown, { toggle: togglePasswordShown }] =
        useDisclosure(false);
    const [confirmPasswordShown, { toggle: toggleConfirmPasswordShown }] =
        useDisclosure(false);

        
    const form = useForm({
        initialValues: {
            firstName: "Albi",
            lastName: "Ummid",
            email: "albi.ummid@gmail.com",
            password: "albiummidtanvir",
            confirmPassword: "albiummidtanvir",
        },
        validate: {
            firstName: (value) =>
                !value ? "Required" : value.length < 3 && "Must be 3 character",
            lastName: (value) =>
                !value ? "Required" : value.length < 3 && "Must be 3 character",
            email: (value) =>
                !/^\S+@\S+$/.test(value)
                    ? "Invalid email"
                    : !value && "Email is required",
            password: (value) =>
                !value
                    ? "Required"
                    : value.length < 6 && "Password must be 6 length",
            confirmPassword: (value, values) =>
                !value
                    ? "Required"
                    : value !== values.password
                    ? "Passwords did not match"
                    : null,
        },
    });
    const router = useRouter();

    const { mutate, error } = useMutation({
        mutationKey: ["register"],
        mutationFn: async (values: typeof form.values) => {
            return await api.post("/auth/register", values);
        },
        onError(error) {
            toast.error(error.message);
        },
        onSuccess(data) {
            toast.success(data.data.message);
            router.push("/auth/login");
        },
    });

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
                    onSubmit={form.onSubmit((values) => {
                        mutate(values);
                    })}
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
                    <p className="text-center text-red-500">{error?.message}</p>
                    <div className="flex justify-center items-center mt-5 space-y-2">
                        <Button fullWidth type="submit">
                            Register
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
