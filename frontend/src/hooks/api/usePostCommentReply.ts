import axios from "axios";
import { useState } from "react";
import { useToast } from "../use-toast";
import { BACKEND_BASE_URL } from "@/config/config";

export const usePostCommentReply = (threadId: string | undefined) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { toast } = useToast()
    const postCommentReply = async ({ commentId, content, createdBy }: { commentId: string, content: string, createdBy: string }) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const { data, status } = await axios.post(`${BACKEND_BASE_URL}/thread/${threadId}/comment/${commentId}/reply`, { content, createdBy })
            console.log(data, status);
            setSuccess(true);
            toast({
                title: "Added Comment",
                duration: 3000
            })
        } catch (error: any) {
            setError(error);
            toast({
                title: "Error Posting Comment",
                variant: "destructive",
                duration: 3000
            })
        } finally {
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        error,
        success,
        postCommentReply
    }
}