import BaseConfirmAlert from "@/components/alert/BaseConfirmAlert";
import BaseButton from "@/components/buttons/base-button/BaseButton";
import { useAuth } from "@/context/AuthContext";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfileSecurityTab() {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const router = useRouter();
  const { userLogout } = useAuth();
  const handleLogout = async () => {
    await userLogout();
    router.replace("/");
  };

  return (
    <div>
      <BaseButton onClick={() => setOpenAlert(true)}>
        <LogOutIcon size={22} strokeWidth={1.5} /> Đăng xuất
      </BaseButton>

      <BaseConfirmAlert
        title="Bạn có chắc chắn muốn đăng xuất?"
        confirmText="Có, Đăng xuất"
        open={openAlert}
        onOpenChange={() => setOpenAlert(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}
