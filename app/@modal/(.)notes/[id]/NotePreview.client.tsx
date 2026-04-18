'use client';

import css from './NotePreview.module.css';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api/clientApi';

const NotePreviewClient = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const closeModal = () => router.back();
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });
  if (isLoading) {
    return (
      <Modal onClose={closeModal}>
        <p>Loading...</p>
      </Modal>
    );
  }
  if (isError) {
    return (
      <Modal onClose={closeModal}>
        <p>Error: {(error as Error).message}</p>
      </Modal>
    );
  }
  if (!note) {
    return (
      <Modal onClose={closeModal}>
        <p>Note not found.</p>
      </Modal>
    );
  }
  return (
    <Modal onClose={closeModal}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      </div>
      <button onClick={closeModal} className={css.backBtn}>
        Close
      </button>
    </Modal>
  );
};

export default NotePreviewClient;
