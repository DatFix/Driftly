"use client";

function checkPermission(
  userPermissions: TPermissionFeature[],
  required: TPermissionFeature[]
) {
  if (!required.length) return true;
  return required.some((p) => userPermissions.includes(p));
}

import { ReactNode } from "react";
import { useAdmin } from "@/context/AdminContext";
import { TPermissionFeature } from "@/types/role.type";
import { useAdminPermissions } from "@/hooks/others/useAdminPermissions";

export function ProtectRoute({
  children,
  permissions,
}: {
  permissions: TPermissionFeature[];
  children: ReactNode;
}) {
  const { adminData, loading: adminLoading } = useAdmin();
  const { permissions: userPermissions, loading: permLoading } =
    useAdminPermissions(adminData);

  if (adminLoading || permLoading) {
    return <div>Đang tải...</div>;
  }

  // super admin
  if (adminData?.id === "administrator") {
    return <>{children}</>;
  }

  const hasPermission = checkPermission(userPermissions, permissions);

  if (!hasPermission) {
    return (
      <div className="wrap-403">
        <h1>403</h1>
        <p>Xin lỗi, bạn không được phép truy cập trang này.</p>
        <button onClick={() => history.back()}>Quay Về</button>
      </div>
    );
  }

  return <>{children}</>;
}
