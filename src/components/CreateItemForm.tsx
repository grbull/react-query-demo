import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { ProblemDetails, TodoCreateDto, TodoDto, todoService } from '../services/todo-service';
import { InlineErrors } from './InlineErrors';
import { TextInput } from './TextInput';

export function CreateItemForm(): ReactElement {
  const [task, setTask] = useState('');
  const queryClient = useQueryClient();
  const mutation = useMutation<TodoDto, ProblemDetails, TodoCreateDto>((createDto) => todoService.create(createDto));

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    mutation.mutate({ task }, { onSuccess: () => queryClient.fetchQuery('todo_items') });
  };
  const handleTaskChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value);
  };

  console.log(mutation.error);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create an Item</h2>

      {mutation.error ? <p>{mutation.error?.title}</p> : null}

      <InlineErrors error={mutation.error} field="Task" />
      <TextInput label="Task" name="todo_task" onChange={handleTaskChange} value={task} />
      <button type="submit">Create</button>
    </form>
  );
}
