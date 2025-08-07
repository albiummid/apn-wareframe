import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import '@mantine/charts/styles.css';
import type { Metadata } from "next";
import "./globals.css";

import Providers from "@/components/providers";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";

export const metadata: Metadata = {
    title: "BetopiaCloud - APN wareframe",
    description: "APN Wareframe",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript />
            </head>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
