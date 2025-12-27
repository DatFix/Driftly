import { useScrollStatus } from "@/hooks/others/useScrollStatus";
import MainTopNav from "./sections/MainTopNav";
import SubNav from "./sections/SubNav";
import MainScrollNav from "./sections/MainScrollNav";

export default function Navbar() {
  const isScrolled = useScrollStatus();

  return (
    <div className="relative">
      {/* Nav bình thường */}
      <div
        className={`transition-all duration-500 ease-in-out mb-5 ${
          isScrolled
            ? "opacity-0 -translate-y-5 pointer-events-none"
            : "opacity-100 translate-y-0"
        }`}
      >
        {/* <SubNav /> */}
        <MainTopNav />
      </div>

      {/* Nav khi scroll */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <MainScrollNav />
      </div>
    </div>
  );
}
