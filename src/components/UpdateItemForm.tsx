import React, { FormEvent, ReactElement, useCallback, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { TodoDto, todoService, TodoUpdateDto } from '../services/todo-service';

export function UpdateItemForm(): ReactElement {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ id, updateDto }: { id: string; updateDto: TodoUpdateDto }) => todoService.update(id, updateDto),
    {
      onSuccess: () => queryClient.fetchQuery('todo_items'),
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
      <h2>Create an Item</h2>
      <label htmlFor="todo_id">id: </label>
      <input name="todo_id" ref={idInputEl} type="text" />
      <label htmlFor="todo_task">Task: </label>
      <input name="todo_task" ref={taskInputEl} type="text" />
      <button type="submit">Update</button>
    </form>
  );
}
