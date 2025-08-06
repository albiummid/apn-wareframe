import { Flex, TagsInput, TextInput } from "@mantine/core";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useEC2CreationState } from ".";

export default function NameAndTag() {
    const { name, tags, setState, errors } = useEC2CreationState();
    const error = errors["name"];

    useEffect(() => {
        if (error) {
            let el = document.getElementById("ac_1");
            el?.scrollIntoView({ behavior: "smooth" });
            toast.error(error);
        }
    }, [error]);

    return (
        <div className=" space-y-5">
            <Flex gap={10}>
                <TextInput
                    error={error}
                    className="w-full"
                    withAsterisk
                    label="Name"
                    placeholder="instance name"
                    value={name}
                    onChange={(e) => {
                        setState({ name: e.target.value });
                    }}
                />
                <TagsInput
                    className="w-2/3"
                    label={"Tags (optional)"}
                    value={tags}
                    onChange={(v) => setState({ tags: v })}
                />
            </Flex>
        </div>
    );
}
