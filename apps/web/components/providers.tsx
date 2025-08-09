"use client";
import { useAppState } from "@/services/states";
import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useEffect } from "react";
import { Bounce, ToastContainer } from "react-toastify";

export const qc = new QueryClient();
const theme = createTheme({
    fontFamily: "Open Sans, sans-serif",
    primaryColor: "cyan",
});

export default function Providers(props: PropsWithChildren) {
    useEffect(() => {
        const token = localStorage.getItem("token") || "";
        const user = localStorage.getItem("user");
        useAppState.setState({
            token,
            user: JSON.parse(user || "{}"),
            isAuthenticated: !!token && !!user,
            isLoading: false,
        });
    }, []);

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />

            <QueryClientProvider client={qc}>
                <MantineProvider theme={theme}>
                    {props.children}
                </MantineProvider>
            </QueryClientProvider>
        </div>
    );
}
