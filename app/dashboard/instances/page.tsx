"use client";
import DashWrapper from "@/component/layouts/dashwrapper";
import EC2InstanceModal, {
    useEC2CreationState,
} from "@/components/modals/ec2-instance-create-modal";
import TurboTable, { TableColumn } from "@/components/turbo-table";
import { Button, Menu, TextInput } from "@mantine/core";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaRotateRight } from "react-icons/fa6";

type TInstanceStatus = "running" | "stopped" | "hibernated" | "rebooting";
export default function Page() {
    const [isLoading, setIsLoading] = useState(false);
    const { opened, setState } = useEC2CreationState();
    const setOpened = (status: boolean) => {
        setState({ opened: status });
    };
    const [instanceInfo, setInstanceInfo] = useState<{
        id: number;
        _id: string;
        status: TInstanceStatus;
    } | null>(null);
    const [selectedRows, setSelectedRows] = useState([]);

    const disableByStatus = (statusList: TInstanceStatus[]) =>
        instanceInfo ? statusList.includes(instanceInfo?.status) : false;

    const stateActions = [
        {
            label: "Stop instance",
            disabled: disableByStatus(["running", "rebooting"]),
            action: () => {},
        },
        {
            label: "Start instance",
            action: () => {},
            disabled: disableByStatus(["running"]),
        },
        {
            label: "Reboot instance",
            action: () => {},
            disabled: instanceInfo?.status === "rebooting",
        },
        {
            label: "Hibernate instance",
            action: () => {},
            disabled: disableByStatus(["running"]),
        },
        {
            label: "Terminate instance",
            disabled: disableByStatus(["rebooting", "stopped"]),
            action: () => {},
        },
    ];

    const instanceActions = [
        {
            label: "Create",
            action: () => {},
            disabled: false,
        },
        {
            label: "Delete",
            action: () => {},
            disabled: false,
            color: "red",
        },
    ];

    const columns: TableColumn<{
        id: string;
        name: string;
        status: TInstanceStatus;
    }>[] = [
        {
            key: "name",
            label: "Name",
        },
        {
            key: "_id",
            label: "Instance Id",
        },
        {
            key: "status",
            label: "Instance state",
            render(row, index, array) {
                return <div>{row.status}</div>;
            },
        },
    ];

    const refetchData = async () => {
        let timeout;
        setIsLoading(true);

        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    return (
        <DashWrapper>
            <div className="space-y-3">
                {/* Top section */}
                <div className="flex justify-between items-center ">
                    <h1 className="text-lg">Instances</h1>
                    <div className=" flex items-center gap-3">
                        <Button
                            onClick={refetchData}
                            // disabled={instanceInfo === null}
                            variant="outline"
                        >
                            <FaRotateRight />
                        </Button>
                        <Button
                            disabled={instanceInfo === null}
                            variant="outline"
                        >
                            Connect
                        </Button>

                        {/* State Management */}
                        <Menu trigger="hover" disabled={instanceInfo === null}>
                            <Menu.Target>
                                <Button disabled={instanceInfo === null}>
                                    Actions
                                </Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Label>State actions</Menu.Label>
                                {stateActions.map((x, i) => (
                                    <Menu.Item
                                        disabled={x?.disabled}
                                        onClick={() => {
                                            x.action();
                                        }}
                                        key={i}
                                    >
                                        {x.label}
                                    </Menu.Item>
                                ))}
                                <Menu.Label>Instance actions</Menu.Label>
                                {instanceActions.map((x, y) => (
                                    <Menu.Item
                                        disabled={x?.disabled}
                                        onClick={() => {
                                            x.action();
                                        }}
                                        key={y}
                                        color={x?.color}
                                    >
                                        {x.label}
                                    </Menu.Item>
                                ))}
                            </Menu.Dropdown>
                        </Menu>

                        <Button
                            onClick={() => {
                                setOpened(true);
                            }}
                            variant="outline"
                        >
                            Launch Instance
                        </Button>
                    </div>
                </div>
                {/* Search sections */}
                <div>
                    <TextInput
                        leftSectionPointerEvents="none"
                        leftSection={<CiSearch />}
                        placeholder="search instances"
                    />
                </div>
                <TurboTable
                    loading={isLoading}
                    striped
                    withRowBorders
                    withColumnBorders
                    selectionEnabled
                    columns={columns}
                    // setSelectedRows={setSelectedRows}
                    onRowSelect={(item) => {
                        setInstanceInfo((pv) => {
                            if (pv && pv._id === item._id) {
                                setSelectedRows([]);
                                return null;
                            }
                            setSelectedRows([item._id]);
                            return item;
                        });
                    }}
                    selectedRows={selectedRows}
                    data={[
                        {
                            _id: "d34fdsfsdfsdfhtjuyik",
                            id: 1,
                            name: "Django Server",
                            status: "running",
                        },
                        {
                            _id: "fdfssdfs5455456555",
                            id: 5,
                            name: "NodeJS realtime server",
                            status: "running",
                        },
                        {
                            _id: "6fsdfsdf438ujkjkl6",
                            id: 6,
                            name: "Hono server",
                            status: "running",
                        },
                    ]}
                />
            </div>
            <EC2InstanceModal />
        </DashWrapper>
    );
}
