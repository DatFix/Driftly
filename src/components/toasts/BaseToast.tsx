// components/BaseToast.tsx
import { Toaster } from "react-hot-toast";

export default function BaseToast() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 4000,
        style: { background: "transparent", boxShadow: "none" },
      }}
    />
  );
}
