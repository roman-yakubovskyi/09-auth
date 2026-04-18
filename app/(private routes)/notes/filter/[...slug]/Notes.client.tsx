'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import css from './Notes.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import { fetchNotes } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

interface NotePageProps {
  tag: string;
}
const NotesPage = ({ tag }: NotePageProps) => {
  const [query, setQuery] = useState<string>('');

  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    return () => {};
  }, []);

  const { data } = useQuery({
    queryKey: ['notes', query, tag, page],
    queryFn: async () => fetchNotes(query, tag, page),
    placeholderData: keepPreviousData,
    refetchOnMount: true,
  });

  const totalPages = data?.totalPages ?? 1;

  const notes = data?.notes ?? [];

  useEffect(() => {}, [data]);

  const handleSearch = useDebouncedCallback((text: string) => {
    setPage(1);
    setQuery(text);
  }, 1000);

  useEffect(() => {}, [query]);

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onChangeText={handleSearch} />
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} setPage={setPage} page={page} />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </div>
      {notes && notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
};

export default NotesPage;
