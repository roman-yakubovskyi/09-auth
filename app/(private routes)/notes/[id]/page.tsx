import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api/serverApi';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return {
    title: note.title,
    description: note.content.slice(0, 150) + '...',

    openGraph: {
      title: note.title,
      description: note.content.slice(0, 150) + '...',
      url: `/notes/${id}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub picture`,
        },
      ],
      type: 'website',
    },
  };
}

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
