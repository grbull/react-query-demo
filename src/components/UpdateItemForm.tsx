import React, { FormEvent, ReactElement, useCallback, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { ProblemDetails, TodoDto, todoService, TodoUpdateDto } from '../services/todo-service';
import { InlineErrors } from './InlineErrors';
import { Input } from './Input';

type Args = { id: string; updateDto: TodoUpdateDto };

export function UpdateItemForm(): ReactElement {
  const queryClient = useQueryClient();
  const mutation = useMutation<TodoDto, ProblemDetails, Args>(
    ({ id, updateDto }) => todoService.update(id, updateDto),
    { onSuccess: () => queryClient.fetchQuery('todo_items') }
  );

  const idInputEl = useRef<HTMLInputElement>(null);
  const taskInputEl = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (idInputEl.current && taskInputEl.current) {
        const id = idInputEl.current.value;
        const updateDto = { task: taskInputEl.current.value };
        mutation.mutate({ id, updateDto });
      }
    },
    [mutation]
  );

  // TODO, if no id is entered, it calls put on / and gets a 405. Best way to handle?
  // https://tkdodo.eu/blog/effective-react-query-keys/

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update an Item</h2>

      {mutation.error ? <p>{mutation.error?.title}</p> : null}

      <div>
        <InlineErrors error={mutation.error} field="todoId" />
        <Input label="ID" name="todo_id" ref={idInputEl} />
      </div>
      <div>
        <InlineErrors error={mutation.error} field="Task" />
        <Input label="Task" name="todo_task" ref={taskInputEl} />
      </div>

      <button type="submit">Update</button>
    </form>
  );
}
