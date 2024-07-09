import { useId, forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "  ", ...props },
  ref,
) {
  const id = useId();
  return (
    <div>
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-blue-600">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className={`w-full h-14 p-2 rounded-md border-2 border-blue-500 outline-none focus:ring-4 ring-blue-300  ${className}`}
        {...props}
        ref={ref}
      />
    </div>
  );
});

export default Input;
