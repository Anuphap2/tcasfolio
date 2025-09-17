// src/components/form/InputField.tsx
import { IconType } from 'react-icons';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';
import { InfoFormData } from "@/types"; 

interface InputFieldProps {
  id: keyof InfoFormData;
  label: string;
  placeholder?: string;
  icon?: IconType;
  register: UseFormRegister<InfoFormData>;
  errors: FieldErrors<InfoFormData>;
  type?: string;
}

export const InputField = ({
  id,
  label,
  placeholder,
  type = "text",
  icon: Icon,
  register,
  errors,
  ...rest
}: InputFieldProps & InputHTMLAttributes<HTMLInputElement>) => {
  const error = errors[id];

  return (
    <div className="flex flex-col">
      <label htmlFor={id as string} className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
        {Icon && <Icon className="text-blue-500" />} {label}
      </label>
      <input
        id={id as string}
        type={type}
        placeholder={placeholder}
        className="input-base"
        // ส่วนนี้คือการแก้ไขที่สำคัญ
        {...register(id)} 
        {...rest}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message as string}</p>}
    </div>
  );
};