import cn from "classnames";
import "./button.scss";

const Button = (props) => {
  const { children, className, disabled } = props;

  return (
    <button disabled={disabled} className={cn("button", className,)}>
      {children}
    </button>
  );
};

export default Button;
