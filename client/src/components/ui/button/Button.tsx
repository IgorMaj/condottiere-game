import styles from "./Button.module.scss";

const Button = (props: {
  label: string;
  onClick?: () => void;
  onDoubleClick?: () => void;
  disabled?: boolean;
}): JSX.Element => {
  return (
    <div
      onClick={props.onClick}
      onDoubleClick={props.onDoubleClick}
      className={`${styles.Button} ${props.disabled ? styles.Disabled : ""}`}
    >
      <span>{props.label}</span>
    </div>
  );
};

export default Button;
