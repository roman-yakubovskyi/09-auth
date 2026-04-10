import type { Metadata } from 'next';
import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';

export const metadata: Metadata = {
  title: 'Create Note',
  description: 'Create New Note in NoteHub',
  metadataBase: new URL(
    'https://08-zustand-f8m2.vercel.app/notes/action/create'
  ),
  openGraph: {
    title: `Create Note`,
    description: 'Create New Note in NoteHub',
    url: `https://08-zustand-f8m2.vercel.app/notes/action/create`,
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

const CreateNote = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;
