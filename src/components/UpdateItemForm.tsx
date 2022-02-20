import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { ProblemDetails, TodoDto, todoService, TodoUpdateDto } from '../services/todo-service';
import { InlineErrors } from './InlineErrors';
import { TextInput } from './TextInput';

type Args = { id: string; updateDto: TodoUpdateDto };

export function UpdateItemForm(): ReactElement {
  const [id, setId] = useState('');
  const [task, setTask] = useState('');
  const queryClient = useQueryClient();
  const mutation = useMutation<TodoDto, ProblemDetails, Args>(({ id, updateDto }) => todoService.update(id, updateDto));

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    mutation.mutate(
      { id, updateDto: { task } },
      { onSuccess: () => queryClient.invalidateQueries(['todo_items', id]) }
    );
  };
  const handleIdChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setId(event.target.value);
  };
  const handleTaskChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value);
  };

  // TODO, if no id is entered, it calls put on / and gets a 405. Best way to handle?
  // https://tkdodo.eu/blog/effective-react-query-keys/

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update an Item</h2>

      {mutation.error ? <p>{mutation.error?.title}</p> : null}

      <div>
        <InlineErrors error={mutation.error} field="todoId" />
        <TextInput label="ID" name="todo_id" onChange={handleIdChange} value={id} />
      </div>
      <div>
        <InlineErrors error={mutation.error} field="Task" />
        <TextInput label="Task" name="todo_task" onChange={handleTaskChange} value={task} />
      </div>

      <button type="submit">Update</button>
    </form>
  );
}
