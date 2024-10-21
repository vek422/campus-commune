import { BACKEND_BASE_URL } from "@/config/config";
import { useAppSelector } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export const useFetchChannel = ({ communeId, channelId }: { communeId: string, channelId: string }) => {
    const { token } = useAppSelector(state => state.auth);


    const fetchChannel = async () => {
        const { data } = await axios.get(`${BACKEND_BASE_URL}/commune/${communeId}/channel/${channelId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data.channel;
    }

    const { data: channel, isLoading, error } = useQuery(
        {
            queryKey: ['channel', communeId, channelId],
            queryFn: fetchChannel,
            enabled: !!token && !!communeId && !!channelId
        },
    );

    console.log("channelll:  ", channel);
    return {
        isLoading,
        error,
        channel,
    }
}
