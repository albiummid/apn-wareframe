"use client";
import { Paper, ScrollArea, Text } from "@mantine/core";
import { useEffect, useRef, useState } from "react";

const TerminalSimulator = ({
    outputLines = [
        "Initializing system...",
        "Checking configuration...",
        "Loading dependencies...",
        "Establishing connection to server...",
        "Fetching data...",
        "Running tasks...",
        "Done ✅",
    ],
    onFinish = () => {},
}: {
    onFinish: () => void;
    outputLines?: string[];
}) => {
    const [visibleLines, setVisibleLines] = useState<string[]>([]);
    const [index, setIndex] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let id;
        if (index < outputLines.length) {
            const timeout = setTimeout(() => {
                setVisibleLines((prev) => [...prev, outputLines[index]]);
                setIndex((prev) => {
                    return prev + 1;
                });
            }, 800); // Time between lines

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [index]);

    useEffect(() => {
        if (index === outputLines.length - 1) {
            const id = setTimeout(() => {
                onFinish();
                clearTimeout(id);
            }, 1500);
        }
    }, [index]);

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [ref.current]);

    return (
        <Paper
            ref={ref}
            shadow="md"
            radius="md"
            p="md"
            style={{
                backgroundColor: "#1e1e1e",
                color: "#d4d4d4",
                fontFamily: "monospace",
                height: "300px",
                overflow: "hidden",
            }}
        >
            <ScrollArea style={{ height: "100%" }}>
                <div>
                    {visibleLines.map((line, i) => (
                        <Text key={i}>{line}</Text>
                    ))}
                </div>
            </ScrollArea>
        </Paper>
    );
};

export default TerminalSimulator;
