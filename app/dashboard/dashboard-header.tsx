import UButton from "@/components/user-button";
import { Flex, Text, TextInput, useMantineColorScheme } from "@mantine/core";
import { spotlight, Spotlight, SpotlightActionData } from "@mantine/spotlight";
import { BiFile, BiHome, BiSearch } from "react-icons/bi";
import { BsDash, BsSlash } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { PiClockCounterClockwise } from "react-icons/pi";
import { RiSideBarFill, RiSideBarLine } from "react-icons/ri";

const actions: SpotlightActionData[] = [
    {
        id: "home",
        label: "Home",
        description: "Get to home page",
        onClick: () => console.log("Home"),
        leftSection: <BiHome size={24} />,
    },
    {
        id: "dashboard",
        label: "Dashboard",
        description: "Get full information about current system status",
        onClick: () => console.log("Dashboard"),
        leftSection: <BsDash size={24} />,
    },
    {
        id: "documentation",
        label: "Documentation",
        description: "Visit documentation to lean more about all features",
        onClick: () => console.log("Documentation"),
        leftSection: <BiFile size={24} />,
    },
];

export default function DashboardHeader({
    opened,
    toggle,
}: {
    opened: boolean;
    toggle: () => void;
}) {
    const { setColorScheme, clearColorScheme, colorScheme } =
        useMantineColorScheme();
    return (
        <Flex className=" border-b border-gray-200 py-2 ">
            <div className=" w-full flex flex-wrap justify-between items-center ">
                <div className="flex items-center gap-3 relative">
                    <div onClick={toggle} className="cursor-pointer">
                        {opened ? <RiSideBarFill /> : <RiSideBarLine />}
                    </div>
                    <Text>Dashboard</Text>
                    <BsSlash className="text-2xl text-gray-300" />
                    <h1 className="">Default</h1>
                </div>
                <div>
                    <div className="flex items-center gap-5">
                        <TextInput
                            onClick={() => {
                                spotlight.open();
                            }}
                            variant="filled"
                            placeholder="search"
                            readOnly
                        />
                        {/* {colorScheme === "dark" ? (
                            <FaRegMoon
                                onClick={() => {
                                    setColorScheme("light");
                                }}
                            />
                        ) : (
                            <IoSunnyOutline
                                onClick={() => {
                                    setColorScheme("dark");
                                }}
                            />
                        )} */}

                        <PiClockCounterClockwise className="text-2xl" />
                        <FaRegBell className="text-xl" />
                        <UButton />
                    </div>
                    <Spotlight
                        actions={actions}
                        nothingFound="Nothing found..."
                        highlightQuery
                        searchProps={{
                            leftSection: <BiSearch size={20} />,
                            placeholder: "Search...",
                        }}
                    />
                </div>
            </div>
        </Flex>
    );
}
