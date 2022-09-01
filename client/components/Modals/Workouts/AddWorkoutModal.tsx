import React, { RefObject, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface AddWorkoutModalProps {
  open: boolean;
  onClose: () => void;
  selector: string;
}

export const AddWorkoutModal: React.FC<AddWorkoutModalProps> = ({
  open,
  onClose,
  selector,
}) => {
  const ref = useRef<any>(null);
  const inputRef = useRef(null) as RefObject<HTMLInputElement>;

  const [mounted, setMounted] = useState(false);

  // const showToastSuccess = () => {
  //     toast.success("User avatar updated successfully", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   };

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
            className="fixed top-0 left-0 bottom-0 right-0 z-50"
            style={{ backgroundColor: 'rgba(0, 0, 0, .7)' }}
          />
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed top-2/4 left-2/4 container mx-auto w-11/12 md:w-2/3 max-w-lg z-50 p-4"
            style={{
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#FFF',
            }}
          >
            <div className="flex items-start justify-between p-5 border-b-2">
              <h3 className="text-gray-900 text-xl lg:text-2xl font-semibold">
                Terms of Service
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="default-modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            {/* <hr /> */}
            <article
              aria-label="File Upload Modal"
              className="relative h-full flex flex-col bg-white  rounded-md"
              // onDrop={() => {}}
              // onDragOver={() => {}}
              // onDragLeave={() => {}}
              // onDragEnter={() => {}}
            >
              <section className="h-full overflow-auto p-8 w-full flex flex-col">
                <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                  {/* <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                        <span>Drag and drop your</span>&nbsp;
                        <span>files anywhere or</span>
                      </p> */}
                  <input
                    // onChange={handleFileInputChange}
                    id="hidden-input"
                    ref={inputRef}
                    type="file"
                    className="hidden"
                  />
                  <button
                    // onClick={handleButtonClick}
                    id="button"
                    className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                  >
                    Upload a file
                  </button>
                </header>

                <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                  To Upload
                </h1>

                <ul id="gallery" className="flex flex-1 flex-wrap -m-1">
                  <li
                    id="empty"
                    className="h-full w-full text-center flex flex-col items-center justify-center"
                  >
                    <span>Workout #1</span>
                  </li>
                </ul>
              </section>

              <footer className="flex justify-end px-8 pb-8 pt-4">
                <button
                  id="submit"
                  //   onClick={handleSubmitFile}
                  className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none"
                >
                  Upload now
                </button>
                <button
                  onClick={() => onClose()}
                  id="cancel"
                  className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                >
                  Cancel
                </button>
              </footer>
            </article>
          </div>
        </>,
        ref.current
      )
    : null;
};
