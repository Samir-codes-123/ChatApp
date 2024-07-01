const Button = ({ children, type = "submit", className = "", ...props }) => {
  return (
    <div>
      <button type={type} className={className} {...props}>
        {children}
      </button>
    </div>
  );
};

export default Button;
