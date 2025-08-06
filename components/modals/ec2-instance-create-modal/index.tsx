import { Accordion, Drawer, ScrollArea } from "@mantine/core";
import { useEffect } from "react";
import { create } from "zustand";

import InstanceTypes from "./instance-type";
import KeyPair from "./keypair";
import NameAndTag from "./name-tag";
import OSImageSelection from "./os-image-selection";

// States
type TState = {
    opened: boolean;
    errors: {
        name?: string;
    };
    name: string;
    tags: string[];
    osImage: {
        label: string;
        imagePath: string;
        description: string;
    };
    osArch: {
        label: string;
        value: string;
    };
    sectionEnabledTill: number;
    activeSections: string[];
    setState: (state: Omit<Partial<TState>, "setState">) => void;
};

export const useEC2CreationState = create<TState>((set, get) => ({
    opened: false,
    name: "",
    tags: [],
    osImage: {
        label: "",
        imagePath: "",
        description: "",
    },
    osArch: {
        label: "",
        value: "",
    },
    sectionEnabledTill: 4,
    activeSections: ["1", "2", "3"],
    errors: {},
    setState(state) {
        set({ ...get(), ...state });
    },
}));

// Component
export default function EC2InstanceModal() {
    const { sectionEnabledTill, opened, activeSections, setState } =
        useEC2CreationState();

    const accordionList = [
        {
            label: "Name and Tags",
            component: <NameAndTag />,
        },
        {
            label: "Key Pairs",
            component: <KeyPair />,
        },
        {
            label: "Application and OS Image (Amazon Machine Image)",
            component: <OSImageSelection />,
        },
        {
            label: "Instance Type",
            component: <InstanceTypes />,
        },
    ];

    // Automatically open the newly enabled section
    useEffect(() => {
        const current = String(sectionEnabledTill);
        if (!activeSections.includes(current)) {
            setState({ activeSections: [...activeSections, current] });
        }
    }, [sectionEnabledTill]);

    const onClose = () => {
        setState({ opened: false, name: "" });
    };

    return (
        <Drawer
            position="right"
            size={"xl"}
            opened={opened}
            onClose={onClose}
            scrollAreaComponent={ScrollArea}
            title="Launch EC2 Instance"
        >
            <Accordion
                multiple
                value={activeSections}
                onChange={(v) => {
                    setState({ activeSections: v });
                }}
                variant="contained"
                radius={"md"}
                chevronIconSize={23}
            >
                {accordionList.map((x, i) => (
                    <Accordion.Item
                        key={x.label}
                        id={"ac_" + String(i + 1)}
                        value={String(i + 1)}
                    >
                        <Accordion.Control
                            disabled={i + 1 > sectionEnabledTill}
                            className=""
                        >
                            <p className="font-semibold">{x.label}</p>
                        </Accordion.Control>
                        <Accordion.Panel>{x.component}</Accordion.Panel>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Drawer>
    );
}
