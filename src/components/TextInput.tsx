import React, { ChangeEvent, ReactElement } from 'react';

interface Props {
  label: string;
  name: string;
  value: string;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
}

export function TextInput({ label, name, onChange, value }: Props): ReactElement {
  return (
    <div>
      <label htmlFor={name}>{label}: </label>
      <input name={name} onChange={onChange} type="text" value={value} />
    </div>
  );
}
