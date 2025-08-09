import { PropsWithChildren } from "react";

type DashProps = {} & PropsWithChildren;

export default function DashWrapper(props: DashProps) {
    return <div className="rounded-lg min-h-screen">{props.children}</div>;
}
