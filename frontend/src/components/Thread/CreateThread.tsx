import { CreateThreadForm } from "@/forms/createThread";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";

export const CreateThread = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add Thread</Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden">
        <>
          <DialogHeader className="text-xl font-bold font-body">
            Create New Thread
          </DialogHeader>
          <div className="w-full">
            <CreateThreadForm />
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
};
