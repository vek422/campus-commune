import NavLink from "./NavLink";

export default function SidebarNav() {
  return (
    <nav className="pt-16 px-4 h-screen flex flex-col gap-4">
      <div className="flex flex-col ">
        <h2 className="text-lg font-semibold">General</h2>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/communes">Communes</NavLink>
        <NavLink href="/">Saved Threads</NavLink>
        <NavLink href="/">Drafts</NavLink>
      </div>
    </nav>
  );
}
