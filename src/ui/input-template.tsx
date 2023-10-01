import React, { ChangeEventHandler } from 'react';

interface InputTemplate {
  type: string;
  name?: string;
  placeholder?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  accept?: string;
  required?: boolean;
}

export default function InputTemplate({
  type,
  name,
  placeholder,
  handleChange,
  className,
  accept,
  required,
}: InputTemplate) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      onChange={handleChange}
      className={className}
      accept={accept}
    />
  );
}
