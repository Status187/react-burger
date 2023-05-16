import * as React from 'react';
import styles from './DrugAndDrop.module.css';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const DrugAndDrop = (): JSX.Element => {

  return (
    <div className={`${styles["draggeble"]} mr-2`}><DragIcon type="primary" /></div>
  )
}