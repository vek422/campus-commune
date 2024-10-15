import { BACKEND_BASE_URL } from "@/config/config";
import axios from "axios";
import { useState } from "react";
import { useToast } from "../use-toast";
import { useAppSelector } from "@/store/store";

export const usePostComment = (threadId: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const { toast } = useToast();
    const postComment = async (content: string, createdBy: string) => {
        setIsLoading(true);
        try {

            const { status } = await axios.post(`${BACKEND_BASE_URL}/thread/${threadId}/comment`, { content, createdBy });
            if (status === 201) {
                // do something
                toast({
                    title: "Comment posted successfully",
                })
                setSuccess(true);
            }
        } catch (err: any) {
            setError(err.message);
            toast({
                title: "Error",
                description: err.message,
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };
    return {
        isLoading,
        error,
        postComment,
        success
    };
}