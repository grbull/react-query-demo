import React, { ReactElement, useCallback } from 'react';
import { useQuery } from 'react-query';

import { todoService } from '../services/todo-service';

export function GetItemsButton(): ReactElement {
  const { refetch } = useQuery('todo_items', todoService.getAll, { enabled: false });

  const handleClick = useCallback(() => refetch(), [refetch]);

  return (
    <button onClick={handleClick} type="button">
      Get Items
    </button>
  );
}
