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
            <Radio.Group label="Key pair type" defaultValue={"rsa"}>
                <Group mt="xs">
                    <Radio value="rsa" label="RSA" />
                    <Radio value="ed25519" label="ED25519" />
                </Group>
            </Radio.Group>
            <Radio.Group label="Private key file format" defaultValue={".ppm"}>
                <Group mt="xs">
                    <Radio
                        value="pem"
                        description="For use with OpenSSH"
                        label=".pem"
                    />
                    <Radio
                        value="ppk"
                        description="For use with PuTTY"
                        label=".ppk"
                    />
                </Group>
            </Radio.Group>
        </Stack>
    );
}
