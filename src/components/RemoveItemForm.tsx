import React, { FormEvent, ReactElement, useCallback, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { todoService } from '../services/todo-service';

export function RemoveItemForm(): ReactElement {
  const queryClient = useQueryClient();
  const mutation = useMutation(todoService.remove, { onSuccess: () => queryClient.fetchQuery('todo_items') });
  const idInputEl = useRef<HTMLInputElement>(null);
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      mutation.mutate(idInputEl.current!.value);
    },
    [mutation]
  );

  return (
    <form onSubmit={handleSubmit}>
      <h2>Remove an Item</h2>
      <label htmlFor="todo_create">Id: </label>
      <input name="todo_create" ref={idInputEl} type="text" />
      <button type="submit">Remove</button>
    </form>
  );
}
