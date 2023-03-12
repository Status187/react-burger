import React from 'react';
import ReactDOM from 'react-dom';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import styles from './Modal.module.css';

interface IModal {
  children: React.ReactNode;
  onClose?: () => void
}

export const Modal = ({
  children,
  onClose = () => {}
}:IModal) => {
  const modalRoot = document.getElementById('react-modals') as HTMLElement;

  const pointRef = React.useRef(null);

  const handlePressEsc = React.useCallback((evt: KeyboardEvent ) => {
    if (evt.key === 'Escape') {
      onClose();
    }
  }, [onClose]);
  
  React.useEffect(() => {
    document.addEventListener('keydown', handlePressEsc);
    return () => {
        document.removeEventListener('keydown', handlePressEsc);
    };
}, [handlePressEsc]);
  
  return ReactDOM.createPortal(
    <div>
      <div className={styles.modal}>
        {children}
      </div>
      <ModalOverlay onClose={onClose} forwardRef={pointRef}/>
    </div>,
    modalRoot
  );
}

