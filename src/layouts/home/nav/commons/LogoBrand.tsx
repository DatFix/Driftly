import { LogoIcon } from "@/components/icons/BaseIcon";
import { useRouter } from "next/navigation";

export default function LogoBrand({
  width = 40,
  height = 40,
  direction = "row",
  clickEnable = true,
}: {
  width?: number;
  height?: number;
  direction?: "row" | "column";
  clickEnable?: boolean;
}) {
  const router = useRouter();
  return (
    <div
      className="flex items-center justify-start gap-1"
      style={{
        flexDirection: direction === "row" ? "row" : "column",
        cursor: clickEnable === true ? "pointer" : "default",
      }}
      onClick={clickEnable ? () => router.push("/") : undefined}
    >
      <LogoIcon color="var(--color-primary)" width={width} height={height} />
      <h1
        className="font-semibold text-(--color-title)"
        style={{ fontSize: `${width * 0.75}px` }}
      >
        Driftly
      </h1>
    </div>
  );
}
