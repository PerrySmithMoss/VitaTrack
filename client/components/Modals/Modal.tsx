import React, { RefObject, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title: string;
  selector: string;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  open,
  onClose,
  title,
  selector,
}) => {
  const ref = useRef<any>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(`#${selector}`);
    setMounted(true);
  }, [selector]);

  if (!open) return null;

  return mounted
    ? createPortal(
        <>
          <div
            onClick={onClose}
            className="fixed top-0 left-0 bottom-0 right-0 z-40"
            style={{ backgroundColor: 'rgba(0, 0, 0, .7)' }}
          />
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed top-2/4 left-2/4 container mx-auto w-11/12 md:w-2/3 max-w-md z-40"
            style={{
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#FFF',
            }}
          >
            <header className="flex items-start justify-between p-5">
              <h2 className="text-gray-900 text-xl lg:text-2xl font-semibold">
                {title}
              </h2>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="default-modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </header>
            {children}
          </div>
        </>,
        ref.current
      )
    : null;
};
