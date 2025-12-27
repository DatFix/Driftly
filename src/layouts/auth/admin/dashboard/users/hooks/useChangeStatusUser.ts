import { IUser } from "@/interfaces/public/IUser.interface";
import { useState } from "react";

export default function useChangeStatusUser() {
  const [ChangeStatusModalOpen, setChangeStatusModalOpen] = useState<boolean>(false);
  const [ChangeStatusItem, setChangeStatusItem] = useState<IUser | null>(null);

  const handleOpenChangeStatus = (user: IUser) => {
    setChangeStatusItem(user), setChangeStatusModalOpen(true);
  };

  const handleCloseChangeStatus = (User: IUser) => {
    setChangeStatusItem(null), setChangeStatusModalOpen(false);
  };

  return {
    ChangeStatusModalOpen,
    ChangeStatusItem,
    handleOpenChangeStatus,
    handleCloseChangeStatus,
  };
}
