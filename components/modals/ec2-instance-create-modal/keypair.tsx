import { Group, Radio, Stack, TextInput } from "@mantine/core";

export default function KeyPair() {
    return (
        <Stack>
            <p>
                A key pair, consisting of a private key and a public key, is a
                set of security credentials that you use to prove your identity
                when connection to an instance
            </p>
            <TextInput
                label="Name"
                description="The name can include up to 255 ASCII characters. It can't include leading or trailing spaces."
            />
            <Radio.Group
                name="favoriteFramework"
                label="Key pair type"
                description="This is anonymous"
                withAsterisk
            >
                <Group mt="xs">
                    <Radio value="rsa" label="RSA" />
                    <Radio value="ed25519" label="ED25519" />
                </Group>
            </Radio.Group>
        </Stack>
    );
}
