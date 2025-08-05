import { Stack } from "@mantine/core";

export default function InstanceTypes() {
    return (
        <Stack>
            <div className="space-y-3">
                <p>Instance Types</p>
                <div className="p-5 cursor-pointer hover:bg-cyan-50 border border-cyan-300 rounded-lg bg-cyan-50/10">
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
        </Stack>
    );
}
