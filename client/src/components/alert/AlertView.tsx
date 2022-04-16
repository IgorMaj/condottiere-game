import React from 'react';
import { useAlert } from 'react-alert';
import { registerAlert } from './alert.service';

// shows that the battle has concluded
export const AlertView = (): JSX.Element => {
  const alert = useAlert();
  const [message, setMessage] = React.useState({
    content: '',
    timestamp: new Date().getTime(),
  });
  React.useEffect(() => {
    registerAlert(setMessage);
    return () => registerAlert(() => {});
  }, []);
  React.useEffect(() => {
    if (message.content) {
      alert.show(message.content);
    }
  }, [message, alert]);
  return <></>;
};
