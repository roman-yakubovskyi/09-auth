import { User } from '@/types/user';
import { nextServer } from '@/lib/api/api';
import type { Note, NoteFormValues } from '@/types/note';

export interface NewUser {
  email: string;
  password: string;
}

export interface EditUser {
  username: string;
}

export const register = async (newUser: NewUser) => {
  const response = await nextServer.post<User>('/auth/register', newUser);
  return response.data;
};

export interface LoginRequest {
  email: string;
  password: string;
}

export const login = async (loginData: LoginRequest) => {
  const response = await nextServer.post<User>('/auth/login', loginData);
  return response.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const response = await nextServer.get<CheckSessionRequest>('/auth/session');
  return response.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const updateMe = async (userData: EditUser) => {
  const { data } = await nextServer.patch<User>('/users/me', userData);
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

interface GetNotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

type GetNotesByIdHttpResponse = Note;
type DeleteNotesHttpResponse = Note;
type PostNotesHttpResponse = Note;

export async function fetchNotes(
  nameSearch: string,
  tag: string = 'all',
  pageCurrent: number = 1
): Promise<GetNotesHttpResponse> {
  const params: Record<string, string | number> = {
    search: nameSearch,
    page: pageCurrent,
    perPage: 12,
  };
  if (tag !== 'all') {
    params.tag = tag;
  }
  const response = await nextServer.get<GetNotesHttpResponse>('/notes', {
    params,
  });
  return {
    notes: response.data.notes,
    totalPages: response.data.totalPages,
  };
}

export async function fetchNoteById(
  noteId: string
): Promise<GetNotesByIdHttpResponse> {
  if (!noteId) {
    throw new Error('Note ID is required to fetch a note');
  }
  const response = await nextServer.get<GetNotesByIdHttpResponse>(
    `/notes/${noteId}`
  );
  return response.data;
}

export async function deleteNote(
  noteId: string
): Promise<DeleteNotesHttpResponse> {
  if (!noteId) {
    throw new Error('Note ID is required for deletion');
  }
  const response = await nextServer.delete<DeleteNotesHttpResponse>(
    `/notes/${noteId}`
  );
  return response.data;
}

export async function createNote(
  noteCreate: NoteFormValues
): Promise<PostNotesHttpResponse> {
  const response = await nextServer.post<PostNotesHttpResponse>(
    '/notes',
    noteCreate
  );
  return response.data;
}
