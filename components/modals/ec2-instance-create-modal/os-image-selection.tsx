import {
    Button,
    Center,
    Flex,
    ScrollArea,
    Select,
    Stack,
    Tabs,
    TextInput,
} from "@mantine/core";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useEC2CreationState } from ".";

export default function OSImageSelection() {
    const [activeTab, setActiveTab] = useState("2");
    return (
        <Stack>
            <p className="text-sm text-gray-500">
                An AMI is a template that contains the software configuration
                (operation system, application server, and applications)
                required to launch your instance. Search or Browse for AMISs if
                you don't see what you are looking for.
            </p>
            <Tabs
                variant="default"
                value={activeTab}
                onChange={(e) => setActiveTab(String(e))}
            >
                <Tabs.List pos={"static"}>
                    <Tabs.Tab value="1">My AMIs</Tabs.Tab>
                    <Tabs.Tab value="2">Quick Start</Tabs.Tab>
                </Tabs.List>
                {/* Panels */}
                <Tabs.Panel value="1">
                    <MyAMIs />
                </Tabs.Panel>
                <Tabs.Panel value="2">
                    <QuickStart />
                </Tabs.Panel>
            </Tabs>
        </Stack>
    );
}

const MyAMIs = () => {
    return <div>my amis</div>;
};

const QuickStart = () => {
    const { osImage, setState, osArch } = useEC2CreationState();

    useEffect(() => {
        setState({ osImage: osList[0], osArch: archList[0] });
    }, []);

    const osList = [
        {
            label: "Amazon Linux",
            imagePath: "/images/os/aws.png",
            description:
                "No cost with the AWS Free Tier. Gain $100 USD credits at sign-up and up to $100 USD more to earn as you explore key AWS services.  Free Plan for up to 6 months. You won't be charged unless you choose the Paid Plan, which allows you to scale your operations and gain access to over 150 AWS services.",
        },
        {
            label: "macOS",
            imagePath: "/images/os/mac-os-logo.png",
            description:
                "The Macintosh Operating System (Mac OS) is an operating system (OS) designed by Apple Inc. to be installed and operated on the Apple Macintosh series of computers. Introduced in 1984, it is a graphical user interface (GUI) based OS that has since been released as multiple different versions.",
        },
        {
            label: "Ubuntu",
            imagePath: "/images/os/ubuntu.png",
            description:
                "It is widely used for cloud computing, with integration support for platforms such as OpenStack. It is also one of the most popular Linux distributions for general desktop use, supported by extensive online communities such as Ask Ubuntu, and has spawned numerous community-maintained variants.",
        },
        {
            label: "Windows",
            imagePath: "/images/os/windows.png",
            description:
                "Microsoft Windows is a type of operating system that is commonly used on computers and laptops. It is responsible for managing the hardware and software related to your computer and provides an interface which allows you to interact with your device.",
        },
    ];

    const OSCard = ({
        onPick,
        imagePath,
        label,
    }: {
        onPick: () => void;
        label: string;
        imagePath: string;
    }) => {
        const isSelected = osImage.label === label;
        return (
            <Stack
                onClick={onPick}
                className={`bg-white cursor-pointer  w-40 p-5 rounded-lg border ${
                    isSelected
                        ? "border-2  border-cyan-500 bg-cyan-400"
                        : "border-gray-300"
                } `}
            >
                <p className=" text-center ">{label}</p>
                <Center>
                    <Image
                        width={100}
                        height={100}
                        className="h-12 w-12 object-contain"
                        src={imagePath}
                        alt=""
                    />
                </Center>
            </Stack>
        );
    };

    const archList = [
        {
            label: "32-Bit Intel/AMD",
            value: "x86",
        },
        {
            label: "64-Bit Intel/AMD",
            value: "x86_64",
        },
        {
            label: "32-Bit ARM",
            value: "arm32",
        },
        {
            label: "64-Bit ARM",
            value: "arm64",
        },
    ];

    const handleNavigateNext = () => {
        setState({ sectionEnabledTill: 6 });
    };

    return (
        <div className="">
            <ScrollArea scrollbars="x" className="">
                <Flex gap={10} py={20}>
                    {osList.map((x) => (
                        <OSCard
                            key={x.label}
                            imagePath={x.imagePath}
                            label={x.label}
                            onPick={() => {
                                setState({ osImage: x });
                            }}
                        />
                    ))}
                </Flex>
            </ScrollArea>
            <div className=" space-y-3">
                <h1 className=" font-semibold">{osImage.label}</h1>
                <p className="text-sm">{osImage.description}</p>
            </div>
            <Flex gap={10} mt={20}>
                <Select
                    placeholder="Select Architecture"
                    label="Architecture"
                    data={archList}
                    value={osArch.value}
                    onChange={(value) => {
                        setState({
                            osArch: archList.find((x) => x.value === value),
                        });
                    }}
                />
                <TextInput
                    disabled
                    // variant=""
                    label="AMI ID"
                    value={`ami-${osArch.value}-009ewce3b5ddfb1`}
                />
            </Flex>
            <Flex justify={"end"} align={"center"}>
                <Button onClick={handleNavigateNext}>Next</Button>
            </Flex>
        </div>
    );
};
