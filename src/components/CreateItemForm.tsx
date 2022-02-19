import React, { FormEvent, ReactElement, useCallback, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { todoService } from '../services/todo-service';

export function CreateItemForm(): ReactElement {
  const queryClient = useQueryClient();
  const mutation = useMutation(todoService.create, { onSuccess: () => queryClient.fetchQuery('todo_items') });
  const inputEl = useRef<HTMLInputElement>(null);
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      mutation.mutate({ task: inputEl.current!.value });
    },
    [mutation]
  );

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create an Item</h2>
      <label htmlFor="todo_create">Task: </label>
      <input name="todo_create" ref={inputEl} type="text" />
      <button type="submit">Create</button>
    </form>
  );
}
