"use client";
import { AppShell, Burger, Button, Group, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { FaChartPie, FaUncharted } from "react-icons/fa";
import { GrStorage } from "react-icons/gr";
import { MdKey } from "react-icons/md";
import { SiAmazonec2 } from "react-icons/si";

export default function DashboardLayout(props: PropsWithChildren) {
    const [opened, { toggle }] = useDisclosure();
    const router = useRouter();
    const pathname = usePathname();

    const navSections = [
        {
            label: "Analytics",
            icon: <FaUncharted />,
            links: [
                {
                    label: "Overview",
                    link: "/overview",
                    icon: <FaChartPie />,
                },
            ],
        },
        {
            label: "APN",
            icon: <FaChartPie />,
            links: [
                {
                    label: "EC2 Instances",
                    link: "/ec2",
                    icon: <SiAmazonec2 />,
                },
                {
                    label: "Elastic Load Balance",
                    link: "/computing/volume",
                    disabled: true,
                    icon: <GrStorage />,
                },
                {
                    label: "Auto Scaling Group",
                    link: "/computing/key-pairs",
                    disabled: true,
                    icon: <MdKey />,
                },
            ],
        },
        {
            label: "CRM",
            icon: <FaUncharted />,
            links: [
                {
                    label: "Overview",
                    link: "/overview",
                    icon: <FaChartPie />,
                },
            ],
        },
        {
            label: "Market Place",
            icon: <FaUncharted />,
            links: [
                {
                    label: "Overview",
                    link: "/overviedw",
                    icon: <FaChartPie />,
                },
            ],
        },
        {
            label: "Reporting Analysis",
            icon: <FaUncharted />,
            links: [
                {
                    label: "Overview",
                    link: "/overvieww",
                    icon: <FaChartPie />,
                },
            ],
        },
        {
            label: "Settings and Admin",
            icon: <FaUncharted />,
            links: [
                {
                    label: "Overview",
                    link: "/overviews",
                    icon: <FaChartPie />,
                },
            ],
        },
    ];

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <p className="text-lg font-bold text-cyan-600">
                        BetopiaCloud
                    </p>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar>
                {navSections.map((section, i) => {
                    return (
                        <AppShell.Section key={i}>
                            <NavLink
                                leftSection={section.icon}
                                label={section.label}
                            >
                                <>
                                    {section.links.map((item, i) => {
                                        const isActive = pathname.includes(
                                            item.link
                                        );
                                        return (
                                            <NavLink
                                                leftSection={item.icon}
                                                disabled={item?.disabled}
                                                key={i}
                                                active={isActive}
                                                label={item.label}
                                                onClick={() => {
                                                    router.push(
                                                        `/dashboard/${item.link}`
                                                    );
                                                }}
                                            />
                                        );
                                    })}
                                </>
                            </NavLink>
                        </AppShell.Section>
                    );
                })}

                {/* Footer */}
                <AppShell.Section
                    className="mt-auto flex justify-center"
                    p="md"
                >
                    <Button>SignOut</Button>
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main>{props.children}</AppShell.Main>
        </AppShell>
    );
}
