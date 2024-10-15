import { BACKEND_BASE_URL } from "@/config/config";
import { useAppSelector } from "@/store/store";
import axios from "axios";
import { useState } from "react"

export const useCreateThread = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [thread, setThread] = useState(null);
    const [error, setError] = useState(null);

    const { token, user } = useAppSelector(state => state.auth)
    const createThread = async (values) => {
        if (!values) return;
        setIsLoading(true);
        try {
            const formData = new FormData();

            formData.append('channelId', values.channelId)
            formData.append('title', values.title)
            formData.append('content', values.content)
            formData.append('createdBy', user.id)

            for (const image of values.images) {
                formData.append('images', image)
            }

            const imagesUri: string[] = [];
            for (const image of values.images)
                imagesUri.push(image.name)

            imagesUri.forEach((image, index) => {
                formData.append(`imagesUri[${index}]`, image);
            })

            const { data, status } = await axios.postForm(`${BACKEND_BASE_URL}/thread`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })

            console.log(data)
        } catch (err) {
            setError(err.message)
        }
    }

    return {
        error,
        thread,
        isLoading,
        createThread
    }
}