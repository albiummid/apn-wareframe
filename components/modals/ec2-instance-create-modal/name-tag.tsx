import { Button, Flex, TagsInput, TextInput } from "@mantine/core";
import { useEC2CreationState } from ".";

export default function NameAndTag() {
    const { name, tags, setState, errors } = useEC2CreationState();
    const error = errors["name"];
    const handleNavigateNext = () => {
        if (name.length > 0) {
            setState({ errors: { name: undefined }, sectionEnabledTill: 2 });
        } else {
            setState({
                errors: { name: "Name field is required" },
                sectionEnabledTill: 1,
            });
        }
    };
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
            <Flex justify={"end"} align={"center"}>
                <Button onClick={handleNavigateNext}>Next</Button>
            </Flex>
        </div>
    );
}
