export interface TodoDto {
  id: string;
  task: string;
}
export interface TodoCreateDto {
  task: string;
}
export interface TodoUpdateDto {
  task: string;
}

const BASE_URL = 'https://localhost:5001/Todo';

async function getAll(): Promise<TodoDto[]> {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    return Promise.reject();
  }
  return await response.json();
}

async function getById(id: string): Promise<TodoDto> {
  const response = await fetch(BASE_URL + '/' + id);
  if (!response.ok) {
    return Promise.reject();
  }
  return await response.json();
}

async function create(createDto: TodoCreateDto): Promise<TodoDto> {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(createDto),
  });
  if (!response.ok) {
    return Promise.reject();
  }
  return await response.json();
}

async function update(id: string, updateDto: TodoUpdateDto): Promise<TodoDto> {
  const response = await fetch(BASE_URL + '/' + id, {
    method: 'PUT',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(updateDto),
  });
  if (!response.ok) {
    return Promise.reject();
  }
  return await response.json();
}

async function remove(id: string): Promise<void> {
  const response = await fetch(BASE_URL + '/' + id, { method: 'DELETE' });
  if (!response.ok) {
    return Promise.reject();
  }
}

export const todoService = { getAll, getById, create, update, remove };
