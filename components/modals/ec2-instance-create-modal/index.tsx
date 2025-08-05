import { Accordion, Drawer, ScrollArea } from "@mantine/core";
import { useEffect } from "react";
import { create } from "zustand";

import InstanceTypes from "./instance-type";
import KeyPair from "./keypair";
import NameAndTag from "./name-tag";
import OSImageSelection from "./os-image-selection";
import StorageVolume from "./storage-volume";
import Summary from "./summary";

// States
type TState = {
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
    sectionEnabledTill: 1,
    activeSections: ["1"],
    errors: {},
    setState(state) {
        let errors = {
            ...get().errors,
        };
        // if (Object.keys(get().errors).length > 0) {
        //     let entries = Object.entries(state);

        //     entries.forEach(([k, v]) => {
        //         if (v && k in errors) {
        //             delete errors[k as keyof TState["errors"]];
        //         }
        //     });
        // }
        set({ ...get(), ...state });
    },
}));

// Component
export default function EC2InstanceModal({
    opened,
    onClose,
}: {
    opened: boolean;
    onClose: () => void;
}) {
    const { sectionEnabledTill, activeSections, setState } =
        useEC2CreationState();
    const accordionList = [
        {
            label: "Name and Tags",
            component: <NameAndTag />,
        },
        {
            label: "Application and OS Image (Amazon Machine Image)",
            component: <OSImageSelection />,
        },
        {
            label: "Instance Type",
            component: <InstanceTypes />,
        },
        {
            label: "Key Pairs",
            component: <KeyPair />,
        },
        {
            label: "StorageVolume",
            component: <StorageVolume />,
        },
        {
            label: "Summary",
            component: <Summary />,
        },
    ];

    // Automatically open the newly enabled section
    useEffect(() => {
        const current = String(sectionEnabledTill);
        if (!activeSections.includes(current)) {
            setState({ activeSections: [...activeSections, current] });
        }
    }, [sectionEnabledTill]);

    return (
        <Drawer
            // withCloseButton={false}
            position="right"
            // size={"xl"}
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
                    <Accordion.Item key={x.label} value={String(i + 1)}>
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
