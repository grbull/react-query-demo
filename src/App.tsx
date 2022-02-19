import React, { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { CreateItemForm } from './components/CreateItemForm';
import { DisplayItems } from './components/DisplayItems';
import { GetItemsButton } from './components/GetItemsButton';
import { RemoveItemForm } from './components/RemoveItemForm';
import { UpdateItemForm } from './components/UpdateItemForm';

const queryClient = new QueryClient();

export function App(): ReactElement {
  return (
    <div>
      <h1>App</h1>
      <QueryClientProvider client={queryClient}>
        <GetItemsButton />
        <DisplayItems />
        <CreateItemForm />
        <UpdateItemForm />
        <RemoveItemForm />
      </QueryClientProvider>
    </div>
  );
}
