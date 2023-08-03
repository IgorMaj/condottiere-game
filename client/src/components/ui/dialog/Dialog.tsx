import Modal from "react-modal";

interface IDialogProps {
  children: JSX.Element;
  isOpen: boolean;
}

const defaultStyles = {
  overlay: {
    background: "var(--dialogOverlay)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "var(--orangebrown)",
  },
};

const Dialog = (props: IDialogProps): JSX.Element => {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.isOpen}
      shouldCloseOnOverlayClick={false}
      style={defaultStyles}
    >
      {props.children}
    </Modal>
  );
};

export default Dialog;
