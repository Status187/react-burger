import * as React from 'react';
import { IModalOverlay } from '../../types';
import styles from './ModalOverlay.module.css';

export const ModalOverlay = ({
  onClose,
  forwardRef
}:IModalOverlay): JSX.Element => {
  
  return (
    <div className={`${styles["modal-overlay"]}`} onClick={onClose} ref={forwardRef}></div>
  )
}