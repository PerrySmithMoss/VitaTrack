import React from 'react';
import styles from './Popover.module.css';

interface PopoverProps {
  children: React.ReactNode;
}

export const Popover: React.FC<PopoverProps> = ({ children }) => {
  return (
    <div>
      <div
        className={`${styles.popoverContainer} m-1 bg-gray-50`}
        tabIndex={-1}
        data-position="bottom"
      >
        <div className={`${styles.popoverText}`}>{children}</div>
        {/* <div className={`${styles.popoverArrow}`}></div> */}
      </div>
    </div>
  );
};
