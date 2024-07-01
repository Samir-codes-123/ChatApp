import { useId, forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref,
) {
  const id = useId();
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input type={type} id={id} className={className} {...props} ref={ref} />
    </div>
  );
});

export default Input;
