import { useOutletContext, useParams } from "react-router-dom";
import { ChannelBreadcrumbs } from "./Components/ChannelBreadcrumbs";
import { useFetchChannel } from "@/hooks/api/useFetchChannel";

import { Thread } from "@/components/Thread/Thread";
import { CreateThread } from "@/components/Thread/CreateThread";
import { ThreadCardLoader } from "@/components/Loaders/ThreadCardLoader";
import { useEffect } from "react";

export default function Channel() {
  const { communeId, channelId } = useParams();
  const [commune] = useOutletContext();
  const { isLoading, error, channel } = useFetchChannel({
    communeId,
    channelId,
  });

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
        <div className="pt-5 flex flex-col flex-1 pb-20 gap-5  w-full overflow-scroll transition-all duration-1000">
          {isLoading
            ? new Array(5).fill(0).map((_, i) => <ThreadCardLoader key={i} />)
            : channel &&
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
