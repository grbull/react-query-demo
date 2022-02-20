import React, { ReactElement } from 'react';

import { isValidationProblemDetails, ProblemDetails } from '../services/todo-service';

interface Props {
  error: ProblemDetails | null;
  field: string;
}

export function InlineErrors({ error, field }: Props): ReactElement | null {
  if (!error) {
    return null;
  }

  if (!isValidationProblemDetails(error)) {
    return null;
  }

  if (!error.errors[field]) {
    return null;
  }

  return (
    <div className="errors-container">
      <ul>
        {error.errors[field].map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  );
}
