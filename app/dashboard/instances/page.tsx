"use client";
import DashWrapper from "@/component/layouts/dashwrapper";
import EC2InstanceModal, {
    useEC2CreationState,
} from "@/components/modals/ec2-instance-create-modal";
import TurboTable, { TableColumn } from "@/components/turbo-table";
import { api } from "@/services/api";
import { Button, Menu, TextInput } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaRotateRight } from "react-icons/fa6";

type TInstanceStatus =
    | "running"
    | "stopped"
    | "hibernated"
    | "rebooting"
    | "terminated";
export default function Page() {
    const {
        data,
        isPending: isLoading,
        refetch,
    } = useQuery({
        queryKey: ["instance-list"],
        queryFn: () => api.get("/ec2"),
        select(data) {
            return data.data;
        },
    });
    const { setState } = useEC2CreationState();
    const setOpened = (status: boolean) => {
        setState({ opened: status });
    };

    const [selectedRows, setSelectedRows] = useState([]);
    const instanceInfo =
        data?.find((x: any) => x._id === selectedRows?.[0]) || null;
    const disableByStatus = useCallback(
        (statusList: TInstanceStatus[]) =>
            instanceInfo ? statusList.includes(instanceInfo?.status) : false,
        [instanceInfo]
    );

    const stateActions = [
        {
            label: "Stop instance",
            disabled: disableByStatus([
                "rebooting",
                "stopped",
                "hibernated",
                "terminated",
            ]),
            action: async () => {
                await api.post(`/ec2/${instanceInfo?._id}`, {
                    status: "stopped",
                });
                refetch();
            },
        },
        {
            label: "Start instance",
            action: async () => {
                await api.post(`/ec2/${instanceInfo?._id}`, {
                    status: "running",
                });
                refetch();
            },
            disabled: disableByStatus(["running"]),
        },
        {
            label: "Reboot instance",
            action: async () => {
                await api.post(`/ec2/${instanceInfo?._id}`, {
                    status: "rebooting",
                });
                refetch();
            },
            disabled: disableByStatus(["hibernated", "terminated"]),
        },
        {
            label: "Hibernate instance",
            action: async () => {
                await api.post(`/ec2/${instanceInfo?._id}`, {
                    status: "hibernated",
                });
                refetch();
            },
            disabled: disableByStatus(["running", "stopped"]),
        },
        {
            label: "Terminate instance",
            disabled: disableByStatus(["rebooting", "stopped", "terminated"]),
            action: async () => {
                await api.post(`/ec2/${instanceInfo?._id}`, {
                    status: "terminated",
                });
                refetch();
            },
        },
    ];

    const instanceActions = [
        {
            label: "Delete",
            action: async () => {
                await api.delete(`/ec2/${instanceInfo?._id}`);
                refetch();
            },
            color: "red",
        },
    ];

    const columns: TableColumn<{}>[] = [
        {
            key: "name",
            label: "Name",
        },
        {
            key: "osImage",
            label: "OS Image",
            render(row: any, index, array) {
                return <p>{row?.osImage?.label}</p>;
            },
        },
        {
            key: "osArch",
            label: "OS Architecture",
        },
        {
            key: "_id",
            label: "Instance Id",
        },
        {
            key: "status",
            label: "Instance state",
            render(row: any, index, array) {
                return <div>{row.status}</div>;
            },
        },
    ];

    return (
        <DashWrapper>
            <div className="space-y-3">
                {/* Top section */}
                <div className="flex justify-between items-center ">
                    <h1 className="text-lg">Instances</h1>
                    <div className=" flex items-center gap-3">
                        <Button onClick={() => refetch()} variant="outline">
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
                        setSelectedRows((pv) => {
                            if (pv[0] === item._id) {
                                return [];
                            }
                            return [item._id];
                        });
                    }}
                    selectedRows={selectedRows}
                    data={data}
                />
            </div>
            <EC2InstanceModal />
        </DashWrapper>
    );
}
