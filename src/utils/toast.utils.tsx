import { X } from "lucide-react";
import toast from "react-hot-toast";

const baseClass =
  "flex items-center w-full max-w-xs px-4 py-2 mb-3 text-gray-500 bg-(--color-card) rounded-full shadow-lg dark:text-gray-400 dark:bg-gray-800";

const closeButton = (t: any) => (
  <button
    onClick={() => toast.dismiss(t.id)}
    className="cursor-pointer ms-auto -mx-1.5 -my-1.5 bg-transparent text-gray-400 hover:text-(--color-text) rounded-lg 
      focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-(--color-background) inline-flex items-center 
      justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
  >
    <X className="w-4 h-4" />
  </button>
);

const animatedContainer = (t: any) =>
  `${
    t.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"
  } ${baseClass} transition-all duration-300 transform flex items-center justify-between`;

export const showSuccessToast = (message: string) =>
  toast.custom((t) => (
    <div className={animatedContainer(t)} role="alert">
      <div className="flex items-center justify-start">
        <div className="shadow-2xl inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-600 rounded-lg dark:bg-green-800 dark:text-green-200">
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
        </div>
        <div className="ms-3 text-sm font-normal text-(--color-text)">
          {message}
        </div>
      </div>
      <div className="ml-2 flex items-center justify-end">{closeButton(t)}</div>
    </div>
  ));

export const showErrorToast = (message: string) =>
  toast.custom((t) => (
    <div className={animatedContainer(t)} role="alert">
      <div className="flex items-center justify-start">
        <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-600 rounded-lg dark:bg-red-800 dark:text-red-200">
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
          </svg>
        </div>
        <div className="ms-3 text-sm font-normal text-(--color-text)">
          {message}
        </div>
      </div>
      <div className="ml-2 flex items-center justify-end">{closeButton(t)}</div>
    </div>
  ));

export const showWarningToast = (message: string) =>
  toast.custom((t) => (
    <div className={animatedContainer(t)} role="alert">
      <div className="flex items-center justify-start">
        <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-yellow-500  rounded-lg dark:bg-orange-700 dark:text-orange-200">
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
          </svg>
        </div>
        <div className="ms-3 text-sm font-normal text-(--color-text)">
          {message}
        </div>
      </div>
      <div className="ml-2 flex items-center justify-end">{closeButton(t)}</div>
    </div>
  ));
