import { Box, Paper, ScrollArea, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useEC2CreationState } from "./modals/ec2-instance-create-modal";

const TerminalSimulator = () => {
    const outputLines = [
        "Initializing system...",
        "Checking configuration...",
        "Loading dependencies...",
        "Establishing connection to server...",
        "Fetching data...",
        "Running tasks...",
        "Done ✅",
    ];
    const { setState, opened } = useEC2CreationState();
    console.log(opened, "L:L");

    const [visibleLines, setVisibleLines] = useState<string[]>([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        let id;
        if (index < outputLines.length) {
            const timeout = setTimeout(() => {
                setVisibleLines((prev) => [...prev, outputLines[index]]);
                setIndex((prev) => {
                    if (prev + 1 === outputLines.length - 1) {
                        setState({ opened: false });
                    }
                    return prev + 1;
                });
            }, 800); // Time between lines

            return () => {
                clearTimeout(timeout);
                clearTimeout(id);
            };
        }
    }, [index]);

    return (
        <Paper
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
                <Box>
                    {visibleLines.map((line, i) => (
                        <Text key={i}>{line}</Text>
                    ))}
                </Box>
            </ScrollArea>
        </Paper>
    );
};

export default TerminalSimulator;
