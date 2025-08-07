import { useAppState } from "@/services/states";
import { Avatar, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";
import { BiChevronRight } from "react-icons/bi";

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    image: string;
    name: string;
    email: string;
    icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
    ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
        <UnstyledButton
            ref={ref}
            style={{
                padding: "var(--mantine-spacing-md)",
                color: "var(--mantine-color-text)",
                borderRadius: "var(--mantine-radius-sm)",
            }}
            {...others}
        >
            <Group>
                <Avatar src={image} radius="xl" />

                <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                        {name}
                    </Text>

                    <Text c="dimmed" size="xs">
                        {email}
                    </Text>
                </div>

                {icon || <BiChevronRight size={16} />}
            </Group>
        </UnstyledButton>
    )
);

export default function UButton() {
    const { user } = useAppState();
    const router = useRouter();

    if (!user) return null;

    return (
        <Menu withArrow>
            <Menu.Target>
                <UserButton
                    image=""
                    // image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                    name={user.firstName + " " + user.lastName}
                    email={user.email}
                />
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item
                    onClick={() => {
                        localStorage.clear();
                        useAppState.setState({
                            user: null,
                            isAuthenticated: false,
                            isLoading: false,
                            token: "",
                        });

                        router.reload();
                    }}
                    color="red"
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
