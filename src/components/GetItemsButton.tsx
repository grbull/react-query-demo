import React, { ReactElement } from 'react';
import { QueryObserverResult, useQuery } from 'react-query';

import { TodoDto, todoService } from '../services/todo-service';

export function GetItemsButton(): ReactElement {
  const { refetch } = useQuery('todo_items', todoService.getAll, { enabled: false });

  const handleClick = (): Promise<QueryObserverResult<TodoDto[], unknown>> => refetch();

  return (
    <button onClick={handleClick} type="button">
      Get Items
    </button>
  );
}
