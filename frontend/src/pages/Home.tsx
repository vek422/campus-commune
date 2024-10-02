import PageLayout from "./PageLayout";

export default function Home() {
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold">Welcome to the Home Page</h1>
        <p className="text-lg mt-4">This is a simple home page</p>
      </div>
    </PageLayout>
  );
}
