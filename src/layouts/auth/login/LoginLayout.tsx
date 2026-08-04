"use client";
import BaseTextInputRhf from "@/components/inputs/base-input/BaseTextInputRhf";
import { ILogin } from "@/interfaces/auth/ILogin.interface";
import { useSimRhf } from "@/hooks/useSimRhf.hook";
import BaseButton from "@/components/buttons/base-button/BaseButton";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AUTH_IMAGES } from "@/constants/images/images.constant";
import {
  ArrowLeftIcon,
  EmailIcon,
  PassIcon,
} from "@/components/icons/BaseIcon";
import { showErrorToast, showSuccessToast } from "@/utils/toast.utils";
import { emailSignUp } from "@/api/auth/admin.api";
import RightLoginLayout from "./section/RightLoginLayout";

export default function LoginLayout() {
  const [isSignUp, setSignUp] = useState<boolean>(false);
  const { user, googleSignIn, emailSignIn } = useAuth();
  const rhf = useSimRhf<ILogin>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = rhf;
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      showSuccessToast("Đăng nhập thành công");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  const handleRegister = async (data: ILogin) => {
    if (data.password !== data.confirmPassword) {
      showErrorToast("Mật khẩu không khớp!");
      return;
    }

    try {
      await emailSignUp(data.email, data.password);
      showSuccessToast("Đăng ký thành công!");
      setSignUp(false); // chuyển lại form đăng nhập
    } catch (err) {
      console.error("❌ Lỗi khi đăng ký:", err);
    }
  };

  const handleLogin = async (data: ILogin) => {
    try {
      await emailSignIn(data.email, data.password);
      showSuccessToast("Đăng nhập thành công!");
      router.replace("/");
    } catch (err) {
      showErrorToast("Đăng nhập thất bại!");
      console.error("❌ Đăng nhập thất bại:", err);
    }
  };

  const onSubmit = async (data: ILogin) => {
    if (isSignUp) await handleRegister(data);
    else await handleLogin(data);
  };

  return (
    <div className="flex items-center justify-between bg-(--color-card) h-screen w-full overflow-hidden">
      <div className="relative flex h-screen flex-col items-center justify-center w-full md:w-1/2">
        <button
          className="absolute top-[2%] left-[2%] lg:top-[5%] lg:left-[5%] px-2 py-2 text-(--color-primary) flex items-center justify-center gap-1 font-medium cursor-pointer"
          onClick={() => router.back()}
        >
          <div className="block md:hidden">
            <ArrowLeftIcon
              color="var(--color-primary)"
              width={35}
              height={35}
            />
          </div>
          <div className="hidden md:block">
            <ArrowLeftIcon color="var(--color-primary)" />
          </div>
          <p className="hidden md:block">Quay lại trang chủ</p>
        </button>

        <div className="flex flex-col items-center justify-center">
          <h1 className="text-(--color-primary) text-3xl font-semibold uppercase drop-shadow-md">
            {isSignUp ? "Đăng ký" : "Đăng nhập"}
          </h1>
          <Image
            src={AUTH_IMAGES.login_bg}
            alt="bg"
            width={1000}
            height={1000}
            className="w-40"
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-80 flex flex-col items-center justify-center"
          >
            <BaseTextInputRhf
              label="Email"
              name="email"
              control={control}
              required
              placeholder="Email"
              icon={<EmailIcon />}
              type="email"
              // autoComplete="email"
            />
            <BaseTextInputRhf
              label="Mật khẩu"
              name="password"
              control={control}
              required
              placeholder="Mật khẩu"
              icon={<PassIcon />}
              type="password"
              // autoComplete={isSignUp ? "new-password" : "current-password"}
            />
            {isSignUp && (
              <BaseTextInputRhf
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                control={control}
                required
                placeholder="Xác nhận mật khẩu"
                icon={<PassIcon />}
                type="password"
                // autoComplete="new-password"
              />
            )}

            <div className="flex items-center justify-end gap-1 w-full">
              {" "}
              <p className="text-sm text-(--color-text)">
                {" "}
                {isSignUp ? "Đã có tài khoản" : "Chưa có tài khoản"}{" "}
              </p>{" "}
              <button
                type="button"
                className="text-sm text-(--color-primary) font-medium cursor-pointer"
                onClick={() => setSignUp(!isSignUp)}
              >
                {" "}
                {isSignUp ? "Đăng nhập" : "Đăng ký ngay"}{" "}
              </button>{" "}
            </div>

            <BaseButton type="submit">
              {isSignUp ? "Đăng ký" : "Đăng nhập"}
            </BaseButton>
          </form>

          <div className="w-60 mx-auto flex items-center justify-center gap-3 my-2">
            <div className="w-1/3 border-b border-gray-300"></div>
            <p className="text-(--color-text)">Hoặc</p>
            <div className="w-1/3 border-b border-gray-300"></div>
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="group relative px-3 py-2 flex items-center justify-start gap-2 bg-(--color-primary) text-white w-12 h-12  transition-all duration-500 ease-in-out cursor-pointer hover:w-[265px] overflow-hidden shadow-lg active:shadow-none active:duration-200"
          >
            <GoogleIcon />
            <p className="absolute left-12 opacity-0 translate-x-2 whitespace-nowrap text-white gray-800 font-medium transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:delay-200">
              Đăng nhập bằng Google
            </p>
          </button>
        </div>
      </div>

      <RightLoginLayout />
    </div>
  );
}

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="icon icon-tabler icons-tabler-filled icon-tabler-brand-google shrink-0"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" />
  </svg>
);
