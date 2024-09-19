import { FC } from "react";
import { Logo } from "./logo";
import { ToggleTheme } from "./toggleTheme";

export const Topbar: FC = () => {
  return (
    <div className="h-12 p-4 flex items-center justify-between w-full fixed top-0 backdrop-blur-sm">
      <Logo />

      <ToggleTheme />
    </div>
  );
};
