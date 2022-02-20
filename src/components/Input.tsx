import React, { ReactElement, RefObject } from 'react';

interface Props {
  ref: RefObject<HTMLInputElement>;
  label: string;
  name: string;
}

function input({ ref, label, name }: Props): ReactElement {
  return (
    <div>
      <label htmlFor={name}>{label}: </label>
      <input name={name} ref={ref} type="text" />
    </div>
  );
}

export const Input = React.forwardRef(input);
