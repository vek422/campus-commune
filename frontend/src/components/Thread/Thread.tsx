import { FC, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Bookmark, Heart, MessageSquare } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SendHorizonal } from "lucide-react";
import { BACKEND_BASE_URL } from "@/config/config";
import { useAppSelector } from "@/store/store";
import { useFetchThreadComments } from "@/hooks/api/useFetchThreadComments";
import { LoadingButton } from "../ui/loadingButton";
import { usePostComment } from "@/hooks/api/usePostComment";
import { calculateAge } from "@/lib/calculateAge";
import { usePostCommentReply } from "@/hooks/api/usePostCommentReply";
import { useFetchCommentReplies } from "@/hooks/api/useFetchCommentReplies";
export function Thread({ thread }) {
  const [showComments, setShowComments] = useState(false);
  console.log("thread", thread);
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
        <div className="flex gap-2 flex-col w-full">
          <div>
            <p className="text-sm">{`${thread?.createdBy?.firstName} ${thread?.createdBy?.lastName}`}</p>
            <p className="text-xs">{calculateAge(thread?.createdAt)}</p>
          </div>
          <h1 className="text-xl font-bold">{thread?.title}</h1>
          <p className="text-sm font-semibold">{thread?.content}</p>
          <ThreadMedia images={thread?.imagesUri} />
          <ThreadToolbar
            toggleComment={() => setShowComments((state) => !state)}
          />
          {showComments && (
            <>
              <AddThreadComment threadId={thread._id} />
              <ThreadComments thread={thread} />
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
function AddThreadComment({ threadId }) {
  const { user } = useAppSelector((state) => state.auth);
  const [content, setContent] = useState("");

  const { isLoading, error, postComment, success } = usePostComment(threadId);
  const handlePostComment = () => {
    if (content.length > 0) postComment(content, user?._id as string);
  };

  useEffect(() => {
    if (success) {
      setContent("");
    }
    console.log(success);
  }, [success]);
  return (
    <div className=" flex gap-2 items-center w-full">
      <Avatar className="w-7 h-7">
        <AvatarImage
          src={`${BACKEND_BASE_URL}/static/${user?.profileUrl}`}
          className="object-cover"
        />
        <AvatarFallback>
          {`${user?.firstName[0]}${user?.lastName[0]}`}
        </AvatarFallback>
      </Avatar>
      <Input
        className="border-none"
        placeholder="Add Comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <LoadingButton
        isLoading={isLoading}
        variant={"default"}
        size={"icon"}
        onClick={handlePostComment}
      >
        <SendHorizonal />
      </LoadingButton>
    </div>
  );
}

function ThreadComments({ thread }) {
  console.log("thread", thread);
  const { comments, isLoading, error, fetchThreadComments, hasMore } =
    useFetchThreadComments(thread._id);
  useEffect(() => {
    fetchThreadComments();
  }, []);
  return (
    <div className="flex flex-col gap-2">
      {comments &&
        comments.map((comment) => (
          <ThreadCommentCard
            key={comment._id}
            comment={comment}
            threadId={thread._id}
          />
        ))}
      {isLoading && <p>Loading...</p>}
      {hasMore && (
        <Button onClick={fetchThreadComments} variant={"link"}>
          Load More
        </Button>
      )}
    </div>
  );
}

function ThreadCommentCard({ comment, threadId }) {
  console.log("comment : ", comment);
  console.log("threadID", threadId);
  const { user } = useAppSelector((state) => state.auth);
  const [showComments, setShowComments] = useState(false);
  const { comments, isLoading, error, fetchCommentReplies, hasMore } =
    useFetchCommentReplies({ threadId, commentId: comment._id });

  useEffect(() => {
    fetchCommentReplies();
  }, []);
  console.log("replies:", comments);
  useEffect(() => {
    if (showComments) fetchCommentReplies();
  }, [showComments]);

  if (!comment) return null;
  return (
    <div className="rounded-lg p-2 bg-muted/20 border-muted border flex flex-col">
      <div className="flex gap-2 items-center">
        <Avatar className="h-7 w-7">
          <AvatarFallback>
            {comment.createdBy.firstName[0]}
            {comment.createdBy.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <p className="text-sm">{`${comment.createdBy.firstName} ${comment.createdBy.lastName}`}</p>
        <p className="text-xs">{calculateAge(comment?.createdAt)}</p>
      </div>
      <div className="pl-9 flex flex-col gap-2">
        <p className="text-sm font-semibold">{comment.content}</p>
        <div className="flex gap-2">
          <Heart size={20} />
          <Button
            size={"icon"}
            onClick={() => {
              setShowComments((state) => !state);
            }}
          >
            <MessageSquare size={20} />
          </Button>
        </div>
        {showComments && (
          <>
            {/*  Add Reply*/}
            <PostCommentReply commentId={comment._id} threadId={threadId} />
            {/* Comment Replies */}
            <div className="flex flex-col w-full">
              {comments &&
                comments.map((reply) => (
                  <ThreadCommentCard
                    key={reply._id}
                    comment={reply}
                    threadId={threadId}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function PostCommentReply({ commentId, threadId }) {
  console.log("Thread Id", threadId);
  const { isLoading, error, success, postCommentReply } =
    usePostCommentReply(threadId);
  const { user } = useAppSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const handlePostReply = () => {
    if (content)
      postCommentReply({
        commentId,
        content,
        createdBy: user._id,
      });
  };
  useEffect(() => {
    if (success) {
      setContent("");
    }
  }, [success]);

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <LoadingButton onClick={handlePostReply}>
        <SendHorizonal size={20} />
      </LoadingButton>
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
