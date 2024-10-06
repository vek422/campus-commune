import SidebarNav from "@/components/SidebarNav";
import { Topbar } from "@/components/topbar";

export default function PageLayout({ children }: { children: JSX.Element }) {
  return (
    <div className="w-screen h-screen bg-secondary flex flex-col overflow-hidden">
      <Topbar />
      <div className="flex flex-1">
        <div className="hidden md:block md:min-w-[200px]">
          <SidebarNav />
        </div>
        <div className="flex-1 pt-14">{children}</div>
      </div>
    </div>
  );
}
