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

export interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  traceId: string;
}

export interface ValidationProblemDetails extends ProblemDetails {
  errors: {
    [Key in keyof any]: string[];
  };
}

export function isValidationProblemDetails(
  error: ProblemDetails | ValidationProblemDetails
): error is ValidationProblemDetails {
  return (error as ValidationProblemDetails).errors !== undefined;
}

const BASE_URL = 'https://localhost:5001/Todo';

const myInit = {
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
};

async function getAll(): Promise<TodoDto[]> {
  const response = await fetch(BASE_URL, myInit);
  if (!response.ok) {
    return Promise.reject();
  }
  return await response.json();
}

async function getById(id: string): Promise<TodoDto> {
  const response = await fetch(BASE_URL + '/' + id, myInit);
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }
  return data;
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
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }
  return data;
}

async function remove(id: string): Promise<void> {
  const response = await fetch(BASE_URL + '/' + id, { method: 'DELETE' });
  if (!response.ok) {
    return Promise.reject();
  }
}

export const todoService = { getAll, getById, create, update, remove };
