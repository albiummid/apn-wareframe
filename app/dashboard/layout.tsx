"use client";
import { AppShell, Box, Button, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { FaChartPie, FaDatabase, FaUncharted } from "react-icons/fa";
import { FaBucket } from "react-icons/fa6";
import { GiNetworkBars } from "react-icons/gi";
import { RiSideBarFill, RiSideBarLine } from "react-icons/ri";
import { SiAmazonec2, SiCivicrm, SiCoinmarketcap, SiPlausibleanalytics } from "react-icons/si";
import DashboardHeader from "./dashboard-header";
import { BiAnalyse } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { GrOverview, GrUserAdmin } from "react-icons/gr";
import { IoMdAnalytics } from "react-icons/io";


export default function DashboardLayout(props: PropsWithChildren) {
    const [opened, { toggle }] = useDisclosure(true);
    const [mobileO, { toggle: toggleMobile }] = useDisclosure(false);
    const router = useRouter();
    const pathname = usePathname();

    const navSections = [
        {
            label: "Analytics",
            icon: <SiPlausibleanalytics  />,
            links: [
                {
                    label: "Overview",
                    link: "/overview",
                    icon: <IoMdAnalytics  />,
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
            icon: <SiCivicrm />,
            links: [
                {
                    label: "Overview",
                    link: "/overview",
                    icon: <SiCivicrm  />,
                },
            ],
        },
        {
            label: "Market Place",
            icon: <SiCoinmarketcap />,
            links: [
                {
                    label: "Market Overview",
                    link: "/overviedw",
                    icon: <GrOverview />,
                },
            ],
        },
        {
            label: "Reporting Analysis",
            icon: <BiAnalyse />,
            links: [
                {
                    label: "Analysis",
                    link: "/Analysis",
                    icon: <BiAnalyse  />,
                },
            ],
        },
        {
            label: "Settings and Admin",
            icon: <IoSettingsOutline />,
            links: [
                {
                    label: "Admin",
                    link: "/Admin",
                    icon: <GrUserAdmin />,
                },
            ],
        },
    ];

    return (
       
        <AppShell
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { mobile: !mobileO, desktop: !opened },
            }}
            padding="md"
        >
            <AppShell.Navbar>
                <AppShell.Section
                    p="md"
                    className="flex items-center justify-between"
                >
                    <Box hiddenFrom="sm">
                        <div onClick={toggleMobile} className="cursor-pointer">
                            {mobileO ? (
                                <RiSideBarFill size={30} />
                            ) : (
                                <RiSideBarLine size={30} />
                            )}
                        </div>
                    </Box>
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
            <AppShell.Main>
                <DashboardHeader
                    opened={opened}
                    toggle={() => {
                        toggle();
                        toggleMobile();
                    }}
                />
                <div className="p-5">{props.children}</div>
            </AppShell.Main>
        </AppShell>
    );
}
