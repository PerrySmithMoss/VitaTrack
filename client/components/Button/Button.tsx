import React from 'react';

interface ButtonProps {
  text: string;
}

export const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <button className="bg-brand-green hover:bg-brand-green-hover text-white px-4 py-2 rounded">
      {text}
    </button>
  );
};
