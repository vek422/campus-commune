import { useOutletContext, useParams } from "react-router-dom";
import { ChannelBreadcrumbs } from "./Components/ChannelBreadcrumbs";
import { useFetchChannel } from "@/hooks/api/useFetchChannel";
import { useEffect, useRef } from "react";
import { Thread } from "@/components/Thread/Thread";
import { Button } from "@/components/ui/button";
import { CreateThread } from "@/components/Thread/CreateThread";

export default function Channel() {
  const { communeId, channelId } = useParams();
  const [commune] = useOutletContext();
  const { isLoading, error, channel, fetchChannel } = useFetchChannel(
    communeId,
    channelId
  );
  console.log("channel", channel);
  useEffect(() => {
    fetchChannel();
  }, [channelId]);

  return (
    <div className="flex ">
      <div className="flex flex-col h-svh w-3/4">
        <div className="h-5">
          <ChannelBreadcrumbs
            communeName={commune?.name}
            communeId={commune?._id}
            channelName={channel?.name}
          />
        </div>
        <div className="flex flex-col flex-1 pb-20 gap-5  w-full overflow-scroll">
          {channel &&
            channel?.threads.map((thread) => {
              return <Thread key={thread._id} thread={thread} />;
            })}
        </div>
      </div>
      <div className="w-1/4 h-screen px-10 py-5 ">
        <CreateThread />
      </div>
    </div>
  );
}
