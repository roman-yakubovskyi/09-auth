'use client';

import css from './NoteForm.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Note, NoteFormValues, NoteTag } from '@/types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createNote } from '@/lib/api/clientApi';
import { useNoteDraftStore } from '@/lib/store/noteStore';

export default function NoteForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setDraft({ ...draft, [name]: value });
  };
  const mutationCreateNote = useMutation({
    mutationFn: (note: NoteFormValues) => createNote(note),
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: (noteNew: Note) => {
      toast.success(`Create note: ${noteNew.title} success !`);
      clearDraft();
      closeForm();
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error: Error) => {
      toast.error(`Created ERROR ${error.message}`);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });
  const closeForm = () => {
    router.back();
  };
  const handleSubmit = (formData: FormData) => {
    const values: NoteFormValues = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as NoteTag,
    };
    mutationCreateNote.mutate(values);
  };
  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={draft?.title}
          onChange={handleChange}
          className={css.input}
          autoFocus
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          defaultValue={draft?.content}
          onChange={handleChange}
          rows={8}
          className={css.textarea}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          defaultValue={draft?.tag}
          onChange={handleChange}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>
      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={closeForm}>
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={isSubmitting}
        >
          Create note
        </button>
      </div>
    </form>
  );
}
