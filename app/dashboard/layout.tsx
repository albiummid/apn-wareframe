"use client";
import { AppShell, Burger, Button, Flex, Group, NavLink, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { FaChartPie, FaDatabase, FaUncharted } from "react-icons/fa";
import { FaBucket } from "react-icons/fa6";
import { SiAmazonec2 } from "react-icons/si";
import { GiNetworkBars } from "react-icons/gi";
import DashboardHeader from "./dashboard-header";
import NotificationBar from "./natification-bar";

export default function DashboardLayout(props: PropsWithChildren) {
    const [opened, { toggle }] = useDisclosure(true);
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
                    icon: <GiNetworkBars />,
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
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { mobile: !opened, desktop: !opened },
            }}
            padding="md"
        >


            <AppShell.Navbar>

                <AppShell.Section p="md" className="flex justify-center">
                    <p className="text-2xl font-bold">BetopiaCloud</p>
                </AppShell.Section>

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
            <AppShell.Main >
                <DashboardHeader opened={opened} toggle={toggle} />
                <div className="flex items-center">
                    <div>
                        {props.children}
                    </div>
                    <NotificationBar />
                </div>


            </AppShell.Main>
        </AppShell>
    );
}
