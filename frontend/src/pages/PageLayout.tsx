import SidebarNav from "@/components/SidebarNav";
import { Topbar } from "@/components/topbar";

export default function PageLayout({ children }: { children: JSX.Element }) {
  return (
    <div className="w-screen h-screen bg-secondary">
      <Topbar />
      <div className="grid grid-cols-7 h-[calc(100%-50px)]">
        <div className="col-span-1 hidden md:block">
          <SidebarNav />
        </div>
        <div className="col-span-6">{children}</div>
      </div>
    </div>
  );
}
