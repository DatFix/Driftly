"use client";
import { AuthApis } from "@/api";
import BaseButton from "@/components/buttons/base-button/BaseButton";
import { EmailIcon, PassIcon } from "@/components/icons/BaseIcon";
import BaseTextInputRhf from "@/components/inputs/base-input/BaseTextInputRhf";
import { useAdmin } from "@/context/AdminContext";
import { useSimRhf } from "@/hooks/useSimRhf.hook";
import { ILogin } from "@/interfaces/auth/ILogin.interface";
import LogoBrand from "@/layouts/home/nav/commons/LogoBrand";
import { showErrorToast, showSuccessToast } from "@/utils/toast.utils";
import { useRouter } from "next/navigation";

export default function AdminLoginLayout() {
  const router = useRouter();
  const { adminLogin } = useAdmin();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useSimRhf<ILogin>();

  const onSubmit = async (data: ILogin) => {
    try {
      await adminLogin(data.email, data.password);
      showSuccessToast("Đăng nhập thành công");
      router.replace("/admin/dashboard");
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
      showErrorToast("Đăng nhập thất bại");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--color-backdround) text-white">
      <div className="relative w-[400px] bg-(--color-card) backdrop-blur-xl shadow-lg rounded-2xl p-8 animate-fadeIn">
        {/* Logo hoặc tiêu đề */}
        <div className="flex flex-col items-center mb-8">
          <LogoBrand direction="column" clickEnable={false} />
          <p className="text-sm text-(--color-text) mt-1">
            Đăng nhập để tiếp tục quản lý
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <BaseTextInputRhf
            label="Email"
            name="email"
            control={control}
            required
            placeholder="Email quản trị"
            icon={<EmailIcon />}
          />
          <BaseTextInputRhf
            label="Mật khẩu"
            name="password"
            control={control}
            required
            placeholder="••••••••"
            icon={<PassIcon />}
            type="password"
          />

          <div className="flex items-center justify-center w-full">
            <BaseButton type="submit">Đăng nhập quản trị viên</BaseButton>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} Admin Dashboard. All rights reserved.
        </p>
      </div>
    </div>
  );
}
