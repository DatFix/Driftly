"use client";

import { useEffect, useState } from "react";
import { AdminApis } from "@/api";
import { IAdmin } from "@/interfaces/auth/IAdmin.interface";
import { TPermissionFeature } from "@/types/role.type";

export function useAdminPermissions(user?: IAdmin | null) {
  const [permissions, setPermissions] = useState<TPermissionFeature[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      setPermissions([]);
      return;
    }

    let mounted = true;

    async function fetchPermissions() {
      try {
        setLoading(true);
        const res = await AdminApis.findOneById(user?.id ?? '');
        if (mounted) {
          setPermissions(res.data.roleData.permissions || []);
        }
      } finally {
        mounted && setLoading(false);
      }
    }

    fetchPermissions();

    return () => {
      mounted = false;
    };
  }, [user?.id]);

  return { permissions, loading };
}
