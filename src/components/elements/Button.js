import { Button as AntdButton } from "antd";

function Button({
  id = null,
  className = "",
  disabled = false,
  type = "primary",
  htmlType = "button",
  onClick = () => {},
  children = null,
  size = "default",
}) {
  return (
    <AntdButton
      {...(id ? { id } : {})}
      className={className}
      disabled={disabled}
      type={type}
      htmlType={htmlType}
      onClick={onClick}
      size={size}
    >
      {children}
    </AntdButton>
  );
}

export default Button;
