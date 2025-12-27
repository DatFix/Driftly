import BaseDrawer from "@/components/drawers/BaseDrawer";
import { LogoIcon } from "@/components/icons/BaseIcon";
import LogoBrand from "./LogoBrand";

export default function MenuDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <BaseDrawer open={open} onClose={onClose} placement="left" width="450px">
      <div className="md:mx-10">
        <LogoBrand />
        <h1 className="text-md font-medium my-2 bg-linear-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
          Đăng tải theo phong cách của bạn
        </h1>
      </div>
    </BaseDrawer>
  );
}
