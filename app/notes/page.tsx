
import { getNoteById } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Notes from "./Notes.client";


export default async function NoteDetailsPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", params.id],
    queryFn: () => getNoteById(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes />
    </HydrationBoundary>
  );
}

