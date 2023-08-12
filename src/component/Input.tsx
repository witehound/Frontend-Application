import { FieldValues, UseFormRegister } from "react-hook-form";

const Input = ({ name, placeholder, params, register }: InputType) => {
  return (
    <div>
      <label htmlFor={name}>{name} : </label>
      <input
        type="text"
        placeholder={placeholder}
        className="h-5 border-gray-300 border rounded-[0.5rem] placeholder:text-gray-300 p-3 w-full"
        {...(register(name), params)}
      />
    </div>
  );
};

export default Input;

interface InputType {
  name: string;
  placeholder: any;
  register: UseFormRegister<FieldValues>;
  params?: any;
}
