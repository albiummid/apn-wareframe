import { qc } from "@/components/providers";
import TerminalSimulator from "@/components/terminal";
import { api } from "@/services/api";
import { Button, Stack } from "@mantine/core";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEC2CreationState } from ".";

export default function InstanceTypes() {
    const { setState, name, osArch, osImage, tags } = useEC2CreationState();
    const [opened, setOpened] = useState(false);

    const validateError = () => {
        let isValid = true;
        if (name.length > 0) {
            setState({
                errors: { name: undefined },
            });
        } else {
            isValid = false;
            let msg = "Name field is required";
            toast.error(msg);
            setState({
                errors: { name: msg },
            });
            document
                .getElementById("ac_1")
                ?.scrollIntoView({ behavior: "smooth" });
        }

        return isValid;
    };
    const handleLaunchInstance = async () => {
        try {
            const isValid = validateError();
            if (!isValid) return;
            const data = {
                name,
                tags,
                osArch: osArch.label,
                osImage,
                status: "running",
            };
            const instance = await api.post("/ec2", data);
            console.log(instance);
            setOpened(true);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Stack>
            <div className="space-y-3">
                <p>Instance Types</p>
                <div className="p-5 cursor-pointer hover:bg-cyan-50 border bg-cyan-50 border-cyan-300 rounded-lg ">
                    <div className=" flex items-center justify-between">
                        <span>t2.micro</span>
                        <span>Free tier eligible</span>
                    </div>
                    <div className=" gap-5 flex mt-3">
                        <span>Family t2</span>
                        <span>1 vCPU</span>
                        <span>1 GiB Memory</span>
                        <span>Current generation true</span>
                    </div>
                    <div className="text-sm">
                        <p>
                            On-Demand aws linux base pricing: 0.01116 USD per
                            Hour
                        </p>
                        <p>
                            On-Demand macOS base pricing: 0.00116 USD per Hour
                        </p>
                        <p>
                            On-Demand windows base pricing: 0.11116 USD per Hour
                        </p>
                        <p>
                            On-Demand ubuntu base pricing: 0.00016 USD per Hour
                        </p>
                    </div>
                </div>
            </div>

            <Button loading={opened} mt={10} onClick={handleLaunchInstance}>
                {opened ? "Launching..." : "Launch Instance"}
            </Button>
            {opened && (
                <TerminalSimulator
                    onFinish={() => {
                        setState({ opened: false });
                        toast.success("EC2 Instance created");
                        qc.invalidateQueries({ queryKey: ["instance-list"] });
                    }}
                />
            )}
        </Stack>
    );
}
