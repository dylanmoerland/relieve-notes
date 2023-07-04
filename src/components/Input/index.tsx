import { type ChangeEventHandler } from "react";

interface InputProps {
  label: string;
  onChange: ChangeEventHandler;
  onBlur: ChangeEventHandler;
  name: string;
  value: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, onChange, onBlur, name, value, error }) => {
  return (
    <div className="flex flex-col flex-grow py-2">
      <span className="text-slate-100">{label}</span>
      <input className="bg-transparent my-2 py-1 px-2 text-slate-100  border-slate-100 border-2 border-solid rounded-md" name={name} value={value} onChange={onChange} onBlur={onBlur} />
      {!!error && <span className="text-red-800">{error}</span>}
    </div>
  );
}