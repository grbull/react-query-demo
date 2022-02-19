import React, { ReactElement, ReactNode } from 'react';

interface Props {
  errors: {
    [Key in keyof any]: string[];
  };
  field: string;
}

export function InlineErrors({ field, errors }: Props): ReactElement {
  if (!errors) {
    return <div />;
  }

  if (!errors[field]) {
    return <div />;
  }
  console.log(errors[field]);

  return (
    <div className="errors-container">
      <ul>
        {errors[field].map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  );
}
