import { toast } from 'react-toastify';
import { TOAST_TIMEOUT } from '../constants';

export const showAlert = (msg: string) => {
  toast(msg, {
    position: 'top-center',
    type: 'default',
    progress: 0,
    closeOnClick: true,
    autoClose: TOAST_TIMEOUT,
    style: {
      marginTop: '0.5em',
      border: '1px solid black',
      borderRadius: '10px',
      textAlign: 'center',
      fontWeight: 900,
      padding: '0.1em',
      color: 'black',
      backgroundColor: 'var(--orangebrown)',
    },
  });
};
