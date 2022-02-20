import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { ProblemDetails, todoService } from '../services/todo-service';
import { InlineErrors } from './InlineErrors';
import { TextInput } from './TextInput';

export function RemoveItemForm(): ReactElement {
  const [id, setId] = useState('');
  const queryClient = useQueryClient();
  const mutation = useMutation<void, ProblemDetails, string>(todoService.remove);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    mutation.mutate(id, { onSuccess: () => queryClient.fetchQuery('todo_items') });
  };
  const handleIdChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setId(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Remove an Item</h2>

      {mutation.error ? <p>{mutation.error?.title}</p> : null}

      <InlineErrors error={mutation.error} field="todoId" />
      <TextInput label="ID" name="todo_id" onChange={handleIdChange} value={id} />
      <button type="submit">Remove</button>
    </form>
  );
}
