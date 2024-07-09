const Button = ({ children, type = "submit", className = "", ...props }) => {
  return (
    <div>
      <button
        type={type}
        className={` bg-blue-500 text-white px-4 py-2 rounded-md border-2 border-blue-800 shadow-md hover:bg-blue-400 active:bg-blue-700 ${className}`}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
