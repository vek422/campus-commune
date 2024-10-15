import { BACKEND_BASE_URL } from "@/config/config";
import { useAppSelector } from "@/store/store";
import axios from "axios";
import { useState } from "react"


export const useFetchChannel = (communeId, channelId) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [channel, setChannel] = useState(null);
    const { token } = useAppSelector(state => state.auth);


    const fetchChannel = async () => {
        try {
            setIsLoading(true)
            const { data, status } = await axios.get(`${BACKEND_BASE_URL}/commune/${communeId}/channel/${channelId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(data)
            if (status === 200) {
                setChannel(data.channel)
            } else {
                setError(data.message);
            }
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        error,
        channel,
        fetchChannel
    }
}