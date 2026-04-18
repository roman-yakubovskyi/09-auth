import type { Metadata } from 'next';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NotesPage from './Notes.client';
import { fetchNotes } from '@/lib/api/serverApi';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `Notes`,
    description: `Notes filtered by ${slug[0]}`,
    openGraph: {
      title: `Notes`,
      description: `Notes in NoteHub, filtered by ${slug[0]}`,
      url: `/notes/filter/${slug[0]}`,
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

export default async function Notes({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? 'all' : slug[0];

  const query = '';

  const page = 1;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', query, tag, page],
    queryFn: () => fetchNotes(query, tag, page),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesPage tag={tag} />
    </HydrationBoundary>
  );
}
