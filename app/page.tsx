"use client";
import { LoadingOverlay } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function IndexPage() {
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof window === "undefined") return;

        const authInfo = localStorage.getItem("auth");
        setAuthenticated(!!authInfo);
        router.push(!!authInfo ? "/dashboard/ec2" : "/auth/login");
    }, []);

    return (
        <div className="min-h-screen w-full justify-center items-center">
            <LoadingOverlay visible />
        </div>
    );
}
