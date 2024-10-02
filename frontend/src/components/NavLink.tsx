import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function NavLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link to={href}>
      <Button
        variant={"link"}
        className="text-secondary-foreground hover:text-foreground hover:no-underline active:font-semibold"
      >
        {children}
      </Button>
    </Link>
  );
}