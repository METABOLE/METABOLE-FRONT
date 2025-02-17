import { LogoTypo } from "@/components/Icons";
import { COLORS } from "@/types";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <LogoTypo color={COLORS.WHITE} />
    </div>
  );
}
