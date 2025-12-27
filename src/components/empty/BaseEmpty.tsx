import { InfoIcon } from "../icons/BaseIcon";

export default function BaseEmpty({
  label = "Chưa có đề xuất",
  size = 24,
}: {
  size?: number;
  label?: string;
}) {
  return (
    <div className="w-full p-5 flex flex-col items-center justify-center gap-1">
      <InfoIcon width={size} height={size} color="var(--color-primary)" />
      <p style={{ fontSize: size * 0.55 }} className="text-(--color-text)">
        {label}
      </p>
    </div>
  );
}
