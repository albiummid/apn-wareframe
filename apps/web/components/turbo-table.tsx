"use client";
import {
    BoxProps,
    Checkbox,
    Group,
    Pagination,
    Table,
    TableProps,
    Text,
    TextInput,
} from "@mantine/core";
import { ReactNode, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

export type TableColumn<Item> = {
    key: string;
    label: string;
    align?: "center" | "left" | "right";
    style?: BoxProps["style"];
    className?: React.HTMLAttributes<HTMLSpanElement>["className"];
    render?: (row: Item, index: number, array: Item[]) => ReactNode;
};

type TurboTableProps<Item> = {
    data: Item[];
    columns: TableColumn<Item>[];
    tableHeader?: ReactNode;
    selectionEnabled?: boolean;
    labelAlign?: "center" | "left" | "right";
    contentAlign?: "center" | "left" | "right";
    striped?: boolean;
    highlightOnHover?: boolean;
    withTableBorder?: boolean;
    withColumnBorders?: boolean;
    onRowSelect?: (item: Item) => void;
    selectedRows: string[];
    setSelectedRows?: (itemArray: string[]) => void;
    // Pagination props
    pagination?: {
        page: number;
        limit: number;
        totalPages: number;
        totalItems: number;
        onPageChange: (page: number) => void;
    };
    // Search props
    searchEnabled?: boolean;
    searchPlaceholder?: string;
    onSearch?: (query: string) => void;
    // Bulk actions
    bulkActions?: ReactNode;
    // Loading state
    loading?: boolean;
} & TableProps;

export default function TurboTable<Item extends {} & { _id: string }>({
    data,
    columns,
    selectionEnabled,
    tableHeader = null,
    labelAlign = "center",
    contentAlign = "center",
    selectedRows,
    pagination,
    searchEnabled = false,
    searchPlaceholder = "Search...",
    onSearch,
    bulkActions,
    loading = false,
    onRowSelect = () => {},
    setSelectedRows = () => {},
    ...tableProps
}: TurboTableProps<Item>) {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        if (onSearch) {
            onSearch(debouncedSearchQuery);
        }
    }, [debouncedSearchQuery, onSearch]);

    const headerRow = columns.map((c, i) => (
        <Table.Th
            className="border-gray-300 border "
            key={i}
            style={{
                textAlign: c.align ?? labelAlign,
                ...c?.style,
            }}
        >
            <span className=" font-semibold ">{c.label}</span>
        </Table.Th>
    ));

    if (selectionEnabled) {
        headerRow.unshift(
            <Table.Th
                key={"checkbox-th"}
                w={10}
                className="border border-t border-gray-300 border-b-0"
            >
                <Checkbox
                    aria-label="Select row"
                    checked={
                        selectedRows?.length === data?.length && data.length > 0
                    }
                    onChange={(event) => {
                        let all = selectedRows?.length === data?.length;
                        setSelectedRows?.(all ? [] : data?.map((x) => x._id));
                    }}
                />
            </Table.Th>
        );
    }

    const rows = data?.map((item, index, array) => {
        const _columns = columns?.map((c) => {
            let element: string | number = "";
            if (c.key.includes(".")) {
                element = getValueByPath<Item>(item, c.key);
            } else {
                element = item[c.key as keyof typeof item] as string;
            }

            return (
                <Table.Td
                    key={c.key}
                    bg={
                        selectedRows?.includes(item._id)
                            ? "var(--mantine-color-blue-light)"
                            : undefined
                    }
                    className={[c.className, ""].join(" ")}
                    style={{ textAlign: c?.align ?? contentAlign, ...c?.style }}
                >
                    {typeof c?.render === "function"
                        ? c.render(item, index, array)
                        : element}
                </Table.Td>
            );
        });

        return (
            <Table.Tr key={item._id}>
                <>
                    {selectionEnabled && (
                        <Table.Td
                            w={10}
                            className=" border border-gray-300 "
                            bg={
                                selectedRows?.includes(item._id)
                                    ? "var(--mantine-color-blue-light)"
                                    : undefined
                            }
                        >
                            <Checkbox
                                aria-label="Select row"
                                checked={selectedRows?.includes(item._id)}
                                onChange={(event) => {
                                    onRowSelect(item);
                                    setSelectedRows(
                                        event.currentTarget.checked
                                            ? [item._id].concat(selectedRows)
                                            : selectedRows?.filter(
                                                  (_id) => _id !== item._id
                                              )
                                    );
                                }}
                            />
                        </Table.Td>
                    )}
                </>
                {_columns}
            </Table.Tr>
        );
    });

    return (
        <div className="space-y-4">
            {/* Search and Bulk Actions */}
            {(searchEnabled || bulkActions) && (
                <Group justify="space-between" align="center">
                    {searchEnabled && (
                        <TextInput
                            placeholder={searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) =>
                                setSearchQuery(e.currentTarget.value)
                            }
                            leftSection={<BiSearch size={16} />}
                            style={{ flex: 1, maxWidth: 300 }}
                        />
                    )}
                    {bulkActions && selectedRows.length > 0 && (
                        <Group>
                            <Text size="sm" c="dimmed">
                                {selectedRows.length} selected
                            </Text>
                            {bulkActions}
                        </Group>
                    )}
                </Group>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
                {tableHeader && <>{tableHeader}</>}
                <Table
                    stickyHeader
                    {...tableProps}
                    withColumnBorders
                    withRowBorders
                    withTableBorder
                >
                    <Table.Thead style={{ backgroundColor: "gray" }}>
                        <Table.Tr>{headerRow}</Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {loading ? (
                            // Show 5 skeleton rows when loading
                            Array.from({ length: 5 }).map((_, rowIdx) => (
                                <Table.Tr key={rowIdx}>
                                    {selectionEnabled && (
                                        <Table.Td className="border-t border-gray-300">
                                            <div className="animate-pulse bg-gray-200 rounded h-5 w-5 mx-auto" />
                                        </Table.Td>
                                    )}
                                    {columns.map((col, colIdx) => (
                                        <Table.Td key={colIdx}>
                                            <div className="animate-pulse bg-gray-200 rounded h-5 w-full" />
                                        </Table.Td>
                                    ))}
                                </Table.Tr>
                            ))
                        ) : data.length === 0 ? (
                            <Table.Tr>
                                <Table.Td
                                    colSpan={
                                        columns.length +
                                        (selectionEnabled ? 1 : 0)
                                    }
                                >
                                    <Text ta="center" py="xl">
                                        No data found
                                    </Text>
                                </Table.Td>
                            </Table.Tr>
                        ) : (
                            rows
                        )}
                    </Table.Tbody>
                </Table>
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
                <Group justify="center">
                    <Pagination
                        total={pagination.totalPages}
                        value={pagination.page}
                        onChange={pagination.onPageChange}
                    />
                    <Text size="sm" c="dimmed">
                        Showing {(pagination.page - 1) * pagination.limit + 1}{" "}
                        to{" "}
                        {Math.min(
                            pagination.page * pagination.limit,
                            pagination.totalItems
                        )}{" "}
                        of {pagination.totalItems} items
                    </Text>
                </Group>
            )}
        </div>
    );
}

export function getValueByPath<T extends object>(obj: T, path: string): string {
    let data = path.split(".").reduce((acc, key) => {
        if (acc && typeof acc === "object" && key in acc) {
            return (acc as any)[key];
        }
        return undefined;
    }, obj);
    return data ? String(data) : "";
}
