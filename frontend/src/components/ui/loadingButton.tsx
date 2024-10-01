import { FC } from "react";
import { Button, ButtonProps } from "./button";
import { LoaderCircle } from "lucide-react";
interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
}
export const LoadingButton: FC<LoadingButtonProps> = (props) => {
  return (
    <Button {...props} className="" disabled={props.isLoading}>
      {props.isLoading && (
        <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
      )}
      {props.children}
    </Button>
  );
};
