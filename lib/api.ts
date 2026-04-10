import axios from 'axios';
import type { Note, NoteFormValues } from '@/types/note';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const myAuthorization = 'Bearer ' + myKey;

axios.defaults.headers.common['Authorization'] = myAuthorization;

interface GetNotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

type GetNotesByIdHttpResponse = Note;
type DeleteNotesHttpResponse = Note;
type PostNotesHttpResponse = Note;

export async function fetchNotes(
  nameSearch: string,
  pageCurrent: number = 1
): Promise<GetNotesHttpResponse> {
  const options = {
    params: {
      search: nameSearch,
      page: pageCurrent,
      perPage: 12,
    },
  };

  const response = await axios.get<GetNotesHttpResponse>('/notes', options);
  return {
    notes: response.data.notes,
    totalPages: response.data.totalPages,
  };
}

export async function fetchNotesByTag(
  nameSearch: string,
  tag: string = 'all',
  pageCurrent: number = 1
): Promise<GetNotesHttpResponse> {
  let options;
  if (tag === 'all') {
    options = {
      params: {
        search: nameSearch,
        page: pageCurrent,
        perPage: 12,
      },
    };
  } else {
    options = {
      params: {
        search: nameSearch,
        page: pageCurrent,
        tag: tag,
        perPage: 12,
      },
    };
  }

  const response = await axios.get<GetNotesHttpResponse>('/notes', options);
  return {
    notes: response.data.notes,
    totalPages: response.data.totalPages,
  };
}

export async function fetchNoteById(
  noteId: string
): Promise<GetNotesByIdHttpResponse> {
  if (noteId !== '') {
    const response = await axios.get<GetNotesByIdHttpResponse>(
      `/notes/${noteId}`
    );
    return response.data;
  } else {
    throw new Error('Note ID is required for deletion');
  }
}

export async function deleteNote(
  noteId: string
): Promise<DeleteNotesHttpResponse> {
  if (noteId !== '') {
    const response = await axios.delete<DeleteNotesHttpResponse>(
      `/notes/${noteId}`
    );

    return response.data;
  } else {
    throw new Error('Note ID is required for deletion');
  }
}

export async function createNote(
  noteCreate: NoteFormValues
): Promise<PostNotesHttpResponse> {
  const response = await axios.post<PostNotesHttpResponse>(
    '/notes',
    noteCreate
  );
  return response.data;
}
