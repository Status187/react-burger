import React from 'react';
import { Link } from 'react-router-dom';

import styles from './NotFound.module.css';

export const NotFound404 = (): JSX.Element => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Oops! 404 Error</h1>
          <p>The page you requested does not exist</p>
          <p>check the address or try <Link to='/' className={styles.link}>homepage</Link></p>
        </div>
      </div>
    </div>
  );
}