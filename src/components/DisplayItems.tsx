import React, { ReactElement } from 'react';
import { useQuery } from 'react-query';

import { todoService } from '../services/todo-service';

export function DisplayItems(): ReactElement {
  const { data } = useQuery('todo_items', todoService.getAll, { enabled: false });

  return (
    <div>
      <h2>Items:</h2>
      <ul>
        {data?.map((item) => (
          <li key={item.id}>
            [{item.id}] {item.task}
          </li>
        ))}
      </ul>
    </div>
  );
}
