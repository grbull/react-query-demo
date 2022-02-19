import React, { FormEvent, ReactElement, useCallback, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { TodoDto, todoService, TodoUpdateDto } from '../services/todo-service';
import { InlineErrors } from './InlineErrors';

interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  traceId: string;
}

interface ValidationProblemDetails<T> extends ProblemDetails {
  errors: {
    [Key in keyof T]: string[];
  };
}

function isValidationProblemDetails<T>(
  error: ProblemDetails | ValidationProblemDetails<T>
): error is ValidationProblemDetails<T> {
  return (error as ValidationProblemDetails<T>).errors !== undefined;
}

export function UpdateItemForm(): ReactElement {
  const [error, setError] = useState<ProblemDetails | ValidationProblemDetails<TodoDto> | undefined>(undefined);

  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ id, updateDto }: { id: string; updateDto: TodoUpdateDto }) => todoService.update(id, updateDto),
    {
      onSuccess: () => {
        queryClient.fetchQuery('todo_items');
        setError(undefined);
      },
      // currently throws a 405 with no problem details, and unable to parse json when no id is provided
      onError: (error: ProblemDetails) => setError(error),
    }
  );
  const idInputEl = useRef<HTMLInputElement>(null);
  const taskInputEl = useRef<HTMLInputElement>(null);
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      mutation.mutate({ id: idInputEl.current!.value, updateDto: { task: taskInputEl.current!.value } });
    },
    [mutation]
  );

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update an Item</h2>
      {error ? <p>{error.title}</p> : null}
      {error && isValidationProblemDetails(error) ? <InlineErrors errors={error.errors} field="todoId" /> : null}
      <label htmlFor="todo_id">id: </label>
      <input name="todo_id" ref={idInputEl} type="text" />
      {error && isValidationProblemDetails(error) ? <InlineErrors errors={error.errors} field="Task" /> : null}
      <label htmlFor="todo_task">Task: </label>
      <input name="todo_task" ref={taskInputEl} type="text" />
      <button type="submit">Update</button>
    </form>
  );
}
