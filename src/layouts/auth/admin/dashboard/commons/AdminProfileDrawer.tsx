import BaseDrawer from "@/components/drawers/BaseDrawer";

export default function AdminProfileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <BaseDrawer open={open} onClose={onClose} placement="right" width="500px">
      <div></div>
    </BaseDrawer>
  );
}
