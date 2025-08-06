"use client";
import { AppShell, Burger, Button, Group, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { FaChartPie, FaDatabase, FaUncharted } from "react-icons/fa";
import { FaBucket } from "react-icons/fa6";
import { SiAmazonec2 } from "react-icons/si";
import { GiNetworkBars } from "react-icons/gi";

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
                    label: "Instances",
                    link: "/instances",
                    icon: <SiAmazonec2 />,
                },
                {
                    label: "S3 Buckest",
                    link: "/s3-buckets",
                    disabled: true,
                    icon: <FaBucket />,
                },
                {
                    label: "RDS Databases",
                    link: "/rds-databases",
                    disabled: true,
                    icon: <FaDatabase />,
                },
                {
                    label: "Networks",
                    link: "/networks",
                    disabled: true,
                    icon: <GiNetworkBars/>,
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
                {navSections.map((section) => {
                    return (
                        <AppShell.Section key={section.label}>
                            <NavLink
                                leftSection={section.icon}
                                label={section.label}
                            >
                                <>
                                    {section.links.map((item) => {
                                        const isActive = pathname.includes(
                                            item.link
                                        );
                                        return (
                                            <NavLink
                                                leftSection={item.icon}
                                                disabled={item?.disabled}
                                                key={item.link}
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
