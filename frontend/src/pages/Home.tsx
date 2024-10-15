import ThreadCard from "@/components/Thread/ThreadCard";
import PageLayout from "./PageLayout";
import { Thread } from "@/components/Thread/Thread";

export default function Home() {
  return (
    <PageLayout>
      <div className="flex flex-col w-full md:w-3/4 p-2 max-h-[100vh] gap-5 pb-20 overflow-scroll">
        <Thread />
        <Thread />
        <Thread />
        <Thread />
      </div>
    </PageLayout>
  );
}
