import { FC, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Bookmark, Heart, MessageSquare } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SendHorizonal } from "lucide-react";
import { BACKEND_BASE_URL } from "@/config/config";
export function Thread({ thread }) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div
      className="w-full  min-h-max bg-secondary/30 border border-secondary rounded-xl p-2 
    flex flex-col gap-2 transition-all duration-500"
    >
      <div className="flex gap-2 ">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={`${BACKEND_BASE_URL}/static/${thread?.createdBy.profileUri}`}
            className="object-cover"
          />
          <AvatarFallback>
            {thread?.createdBy?.firstName[0] + thread?.createdBy?.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex gap-2 flex-col">
          <div>
            <p className="text-sm">{`${thread?.createdBy?.firstName} ${thread?.createdBy?.lastName}`}</p>
            <p className="text-xs">2hrs ago</p>
          </div>
          <h1 className="text-xl font-bold">{thread?.title}</h1>
          <p className="text-sm font-semibold">{thread?.content}</p>
          <ThreadMedia images={thread?.imagesUri} />
          <ThreadToolbar
            toggleComment={() => setShowComments((state) => !state)}
          />
          {showComments && (
            <>
              <ThreadComment />
              <AddCommentCard />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const ThreadMedia = ({ images }: { images?: string[]; videos?: string[] }) => {
  return (
    <div className="flex gap-2">
      {images?.map((imageUri) => (
        <img
          src={`${BACKEND_BASE_URL}/static/${imageUri}`}
          alt="commune"
          className="w-44 h-44 object-cover overflow-hidden rounded-lg border border-muted shadow-sm"
        />
      ))}
    </div>
  );
};
function AddCommentCard() {
  return (
    <div className=" flex gap-2 items-center">
      <Avatar className="w-7 h-7">
        <AvatarImage src="/sample1.jpg" className="object-cover" />
        <AvatarFallback>vk</AvatarFallback>
      </Avatar>
      <Input className="border-none" placeholder="Add Comment" />
      <Button variant={"default"} size={"icon"}>
        <SendHorizonal />
      </Button>
    </div>
  );
}
function ThreadComment() {
  return (
    <div className="rounded-lg  p-2 bg-muted/20 border-muted border flex flex-col">
      <div className="flex gap-2 items-center">
        <Avatar className="h-7 w-7">
          <AvatarFallback>CG</AvatarFallback>
        </Avatar>
        <p className="text-sm">Chaitanya Gore</p>
        <p className="text-xs">2hrs ago</p>
      </div>
      <div className="pl-9 flex flex-col gap-2">
        <p className="text-sm font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque illum
          molestias nulla! Veritatis, atque odit?
        </p>
        <div className="flex gap-2">
          <Heart size={20} />
          <MessageSquare size={20} />
        </div>
      </div>
    </div>
  );
}
function ThreadToolbar({ toggleComment }) {
  return (
    <div className="h-10 gap-5 rounded-lg flex items-center max-w-min ">
      <Button variant={"ghost"} size={"icon"} onClick={toggleComment}>
        <MessageSquare size={20} />
      </Button>
      <Heart size={20} />
      <Bookmark size={20} />
    </div>
  );
}
